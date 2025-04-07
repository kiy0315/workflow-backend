import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Workflow } from 'src/workflow/workflow.entity';
import { Step } from 'src/step/step.entity';
import { User } from 'src/user/user.entity';
import { TaskHistory } from 'src/taskHistory/taskHistory.entity';

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

  @ManyToOne(() => Workflow, (workflow) => workflow.tasks)
  workflow: Workflow;

  @ManyToOne(() => Step, (step) => step.tasks)
  currentStep: Step;

  @ManyToOne(() => User, (user) => user.tasks)
  assignedTo: User;

  @OneToMany(() => TaskHistory, (history) => history.task)
  history: TaskHistory[];
}
