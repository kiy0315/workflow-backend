import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Task } from 'src/task/task.entity';
import { Step } from 'src/step/step.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class TaskHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Task, (task) => task.history)
  task: Task;

  @ManyToOne(() => Step)
  step: Step;

  @ManyToOne(() => User, (user) => user.taskHistories)
  movedBy: User;

  @CreateDateColumn()
  movedAt: Date;
}
