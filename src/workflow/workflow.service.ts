import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workflow } from './workflow.entity';
import { CreateWorkflowDto } from './dto/createWorkflow.dto';
import { UpdateWorkflowDto } from './dto/updateWorkflow.dto';

@Injectable()
export class WorkflowService {
  constructor(
    @InjectRepository(Workflow)
    private readonly workflowRepository: Repository<Workflow>,
  ) {}

  async create(createWorkflowDto: CreateWorkflowDto): Promise<Workflow> {
    const workflow = this.workflowRepository.create(createWorkflowDto);
    return this.workflowRepository.save(workflow);
  }

  async findAll(): Promise<Workflow[]> {
    return this.workflowRepository.find({
      relations: ['steps'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Workflow> {
    const workflow = await this.workflowRepository.findOne({
      where: { id },
      relations: ['steps', 'steps.tasks'],
    });

    if (!workflow)
      throw new NotFoundException(`Workflow with ID ${id} not found`);

    return workflow;
  }

  async update(
    id: number,
    updateWorkflowDto: UpdateWorkflowDto,
  ): Promise<Workflow> {
    const workflow = await this.findOne(id);
    Object.assign(workflow, updateWorkflowDto);
    return this.workflowRepository.save(workflow);
  }

  async remove(id: number): Promise<void> {
    const workflow = await this.findOne(id);
    await this.workflowRepository.remove(workflow);
  }

  async duplicate(id: number): Promise<Workflow> {
    try {
      const original = await this.findOne(id);
      const name = await this.generateDuplicateName(original.name);

      const duplicate = this.workflowRepository.create({
        name,
        description: original.description,
        createdById: original.createdById,
        steps: original.steps.map((step) => ({
          ...step,
          id: undefined,
          workflow: undefined,
          tasks: step.tasks.map((task) => ({
            ...task,
            id: undefined,
            step: undefined,
          })),
        })),
      });

      return await this.workflowRepository.save(duplicate);
    } catch (error) {
      console.error('워크플로우 복제 실패:', error);
      throw new Error('복제 중 오류가 발생했습니다');
    }
  }

  async generateDuplicateName(baseName: string): Promise<string> {
    const existing = await this.workflowRepository
      .createQueryBuilder('workflow')
      .where('workflow.name LIKE :name', { name: `${baseName} (복사본%)` })
      .getMany();

    const numbers = existing
      .map((w) => {
        const match = w.name.match(/\(복사본(?: (\d+))?\)$/);
        return match ? parseInt(match[1] || '1', 10) : 1;
      })
      .filter((n) => !isNaN(n));

    const maxNum = numbers.length > 0 ? Math.max(...numbers) : 0;
    const nextNum = maxNum + 1;
    return `${baseName} (복사본${nextNum > 1 ? ' ' + nextNum : ' '})`;
  }

  async getProgress(id: number): Promise<{
    stepProgress: number;
    taskProgress: number;
  }> {
    const workflow = await this.findOne(id);
    const steps = workflow.steps;

    const totalSteps = steps.length;
    const completedSteps = steps.filter((step) => step.isCompleted).length;
    const stepProgress = totalSteps ? (completedSteps / totalSteps) * 100 : 0;

    const allTasks = steps.flatMap((step) => step.tasks);
    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter((task) => task.isCompleted).length;
    const taskProgress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

    return {
      stepProgress,
      taskProgress,
    };
  }
}
