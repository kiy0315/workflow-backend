import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Workflow } from '../workflow/workflow.entity';
import { Task } from '../task/task.entity';
import { TaskHistory } from '../taskHistory/taskHistory.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Workflow, (workflow) => workflow.createdBy)
  workflows: Workflow[];

  @OneToMany(() => Task, (task) => task.assignedTo)
  task: Task[];

  @OneToMany(() => TaskHistory, (history) => history.movedBy)
  taskHistories: TaskHistory[];
}
