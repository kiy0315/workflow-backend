import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Step } from './step.entity';
import { CreateStepDto } from './dto/createStep.dto';
import { UpdateStepDto } from './dto/updateStep.dto';
import { generateDuplicateName } from 'src/utils/generateDuplicateName';

@Injectable()
export class StepService {
  constructor(
    @InjectRepository(Step)
    private readonly stepRepository: Repository<Step>,
  ) {}

  async create(createStepDto: CreateStepDto): Promise<Step> {
    const step = this.stepRepository.create(createStepDto);
    return this.stepRepository.save(step);
  }

  async findAll(): Promise<Step[]> {
    return this.stepRepository.find({ relations: ['tasks'] });
  }

  async findOne(id: number): Promise<Step> {
    const step = await this.stepRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });

    if (!step) throw new NotFoundException(`Step with ID ${id} not found`);

    return step;
  }

  async update(id: number, updateStepDto: UpdateStepDto): Promise<Step> {
    const step = await this.findOne(id);
    Object.assign(step, updateStepDto);
    return this.stepRepository.save(step);
  }

  async remove(id: number): Promise<void> {
    const step = await this.findOne(id);
    await this.stepRepository.remove(step);
  }

  async duplicateStepToWorkflow(
    stepId: number,
    toWorkflowId: number,
  ): Promise<Step> {
    const step = await this.stepRepository.findOne({
      where: { id: stepId },
      relations: ['tasks'],
    });

    if (!step) throw new NotFoundException('Step not found');

    const name = await generateDuplicateName(
      this.stepRepository,
      step.name,
      'name',
      { workflowId: toWorkflowId },
    );

    const newStep = this.stepRepository.create({
      name,
      order: step.order,
      isCompleted: false,
      workflowId: toWorkflowId,
      tasks: step.tasks.map((task) => ({
        ...task,
        id: undefined,
        currentStep: undefined,
      })),
    });

    return this.stepRepository.save(newStep);
  }
}
