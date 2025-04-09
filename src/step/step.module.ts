import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Step } from './step.entity';
import { StepService } from './step.service';
import { StepController } from './step.controller';
import { Task } from 'src/task/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Step, Task])],
  providers: [StepService],
  controllers: [StepController],
})
export class StepModule {}
