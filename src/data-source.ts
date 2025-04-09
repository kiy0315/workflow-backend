import { DataSource } from 'typeorm';
import { User } from './user/user.entity';
import { Workflow } from './workflow/workflow.entity';
import { Step } from './step/step.entity';
import { Task } from './task/task.entity';
import { TaskHistory } from './taskHistory/taskHistory.entity';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Workflow, Step, Task, TaskHistory],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
