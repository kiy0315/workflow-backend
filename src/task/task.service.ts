import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { generateDuplicateName } from 'src/utils/generateDuplicateName';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
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
