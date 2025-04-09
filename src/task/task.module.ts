import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Step } from '../step/step.entity';
import { Workflow } from '../workflow/workflow.entity';
import { User } from '../user/user.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Task,
      Step,
      Workflow,
      User,
    ]),
  ],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
