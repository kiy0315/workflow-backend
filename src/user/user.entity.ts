import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Workflow } from 'src/workflow/workflow.entity';
import { Task } from 'src/task/task.entity';
import { TaskHistory } from 'src/taskHistory/taskHistory.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Workflow, (workflow) => workflow.createdBy)
  workflows: Workflow[];

  @OneToMany(() => Task, (task) => task.assignedTo)
  tasks: Task[];

  @OneToMany(() => TaskHistory, (history) => history.movedBy)
  taskHistories: TaskHistory[];
}
