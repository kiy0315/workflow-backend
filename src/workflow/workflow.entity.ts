import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Step } from '../step/step.entity';
import { User } from '../user/user.entity';
import { Task } from '../task/task.entity';

@Entity()
export class Workflow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.workflows)
  createdBy: User;

  @OneToMany(() => Step, (step) => step.workflow, { cascade: true })
  step: Step[];

  @OneToMany(() => Task, (task) => task.currentStep, { cascade: true })
  task: Task[];
}
