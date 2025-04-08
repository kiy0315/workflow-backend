import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskHistoryService } from './taskHistory.service';
import { TaskHistoryController } from './taskHistory.controller';
import { TaskHistory } from './taskHistory.entity';
import { Task } from 'src/task/task.entity';
import { Step } from 'src/step/step.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskHistory, Task, Step, User])],
  controllers: [TaskHistoryController],
  providers: [TaskHistoryService],
})
export class TaskHistoryModule {}
