import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workflow } from './workflow.entity';
import { WorkflowService } from './workflow.service';
import { WorkflowController } from './workflow.controller';
import { Step } from 'src/step/step.entity';
import { Task } from 'src/task/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workflow, Step, Task])],
  providers: [WorkflowService],
  controllers: [WorkflowController],
})
export class WorkflowModule {}
