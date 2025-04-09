import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { User } from './user/user.entity';
import { Workflow } from './workflow/workflow.entity';
import { Step } from './step/step.entity';
import { Task } from './task/task.entity';
import { TaskHistory } from './taskHistory/taskHistory.entity';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { WorkflowModule } from './workflow/workflow.module';
import { StepModule } from './step/step.module';
import { TaskModule } from './task/task.module';
import { TaskHistoryModule } from './taskHistory/taskHistory.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Workflow, Step, Task, TaskHistory],
      synchronize: false,
    }),
    UserModule,
    AuthModule,
    WorkflowModule,
    StepModule,
    TaskModule,
    TaskHistoryModule,
  ],
})
export class AppModule {}
