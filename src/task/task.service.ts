import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { generateDuplicateName } from '../utils/generateDuplicateName';
import { Workflow } from '../workflow/workflow.entity';
import { Step } from '../step/step.entity';
import { User } from '../user/user.entity';
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Step)
    private readonly stepRepository: Repository<Step>,
    @InjectRepository(Workflow)
    private readonly workflowRepository: Repository<Workflow>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { workflowId, currentStepId, assignedToId, ...rest } = createTaskDto;

    const task = this.taskRepository.create(rest);

    const workflow = await this.workflowRepository.findOneBy({
      id: workflowId,
    });
    if (!workflow) throw new NotFoundException('해당 워크플로우가 없습니다.');
    task.workflow = workflow;

    const step = await this.stepRepository.findOneBy({ id: currentStepId });
    if (!step) throw new NotFoundException('해당 스텝이 없습니다.');
    task.currentStep = step;

    if (assignedToId) {
      const user = await this.userRepository.findOneBy({ id: assignedToId });
      if (!user) throw new NotFoundException('해당 유저가 없습니다.');
      task.assignedTo = user;
    }

    return this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
    });
    if (!task) throw new NotFoundException(`Workflow with ID ${id} not found`);
    return task;
  }

  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  async duplicate(id: number): Promise<Task> {
    try {
      const original = await this.findOne(id);
      const title = await generateDuplicateName(
        this.taskRepository,
        original.title,
        'title',
      );

      const duplicate = this.taskRepository.create({
        title,
        description: original.description,
        workflow: undefined,
        currentStep: undefined,
        assignedTo: undefined,
      });

      return await this.taskRepository.save(duplicate);
    } catch (error) {
      console.error('워크플로우 복제 실패:', error);
      throw new Error('복제 중 오류가 발생했습니다');
    }
  }
}
