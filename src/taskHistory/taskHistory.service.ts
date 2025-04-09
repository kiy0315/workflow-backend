import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskHistory } from './taskHistory.entity';
import { CreateTaskHistoryDto } from './dto/createTaskHistory.dto';
import { Task } from 'src/task/task.entity';
import { Step } from 'src/step/step.entity';
import { User } from 'src/user/user.entity';
import { PaginationDto } from 'src/common/pagination/dto/pagination.dto';

@Injectable()
export class TaskHistoryService {
  constructor(
    @InjectRepository(TaskHistory)
    private readonly taskHistoryRepository: Repository<TaskHistory>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(Step)
    private readonly stepRepository: Repository<Step>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createTaskHistoryDto: CreateTaskHistoryDto,
  ): Promise<TaskHistory> {
    const { taskId, stepId, movedById } = createTaskHistoryDto;

    const task = await this.taskRepository.findOne({
      where: { id: taskId },
    });

    if (!task) throw new NotFoundException(`Task with ID ${taskId} not found`);

    const step = await this.stepRepository.findOne({ where: { id: stepId } });

    if (!step) throw new NotFoundException(`Step with ID ${stepId} not found`);

    const movedBy = await this.userRepository.findOne({
      where: { id: movedById },
    });
    if (!movedBy)
      throw new NotFoundException(`User with ID ${movedById} not found`);

    const taskHistory = this.taskHistoryRepository.create({
      task,
      step,
      movedBy,
    });
    return this.taskHistoryRepository.save(taskHistory);
  }

  async findAllByUser(userId: number, paginationDto: PaginationDto): Promise<TaskHistory[]> {
    const { limit, skip } = paginationDto;
    return this.taskHistoryRepository.find({
      where: { movedBy: { id: userId } },
      relations: ['task', 'step'],
      order: { movedAt: 'DESC' },
      take: limit,
      skip,
    });
  }


  async findOne(id: number): Promise<TaskHistory> {
    const taskHistory = await this.taskHistoryRepository.findOne({
      where: { id },
      relations: ['task', 'step'],
    });

    if (!taskHistory)
      throw new NotFoundException(`TaskHistroy with ID ${id} not found`);

    return taskHistory;
  }
  
  async findAllByTask(taskId: number, paginationDto: PaginationDto): Promise<TaskHistory[]> {
    const { limit, skip } = paginationDto;
    return this.taskHistoryRepository.find({
      where: { task: { id: taskId } },
      relations: ['task', 'step', 'movedBy'],
      order: { movedAt: 'DESC' },
      take: limit,
      skip,
    });
  }

  async findAllByStep(stepId: number, paginationDto: PaginationDto): Promise<TaskHistory[]> {
    const { limit, skip } = paginationDto;
    return this.taskHistoryRepository.find({
      where: { step: { id: stepId } },
      relations: ['task', 'step', 'movedBy'],
      order: { movedAt: 'DESC' },
      take: limit,
      skip,
    });
  }

  async findAll(paginationDto: PaginationDto): Promise<TaskHistory[]> {
    const { limit, skip } = paginationDto;
    return this.taskHistoryRepository.find({
      relations: ['task', 'step', 'movedBy'],
      order: { movedAt: 'DESC' },
      take: limit,
      skip,
    });
  }
}
