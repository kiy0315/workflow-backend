import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Workflow } from '../workflow/workflow.entity';
import { Step } from '../step/step.entity';
import { User } from '../user/user.entity';
import { TaskHistory } from '../taskHistory/taskHistory.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  isCompleted: boolean;

  @ManyToOne(() => Workflow, (workflow) => workflow.task)
  workflow: Workflow;

  @ManyToOne(() => Step, (step) => step.task, {
    onDelete: 'SET NULL',
  })
  currentStep: Step;
  @ManyToOne(() => User, (user) => user.task)
  assignedTo: User;

  @OneToMany(() => TaskHistory, (history) => history.task)
  history: TaskHistory[];
}
