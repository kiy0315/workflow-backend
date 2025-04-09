import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Workflow } from '../workflow/workflow.entity';
import { Task } from '../task/task.entity';

@Entity()
export class Step {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  order: number; // step 순서

  @Column()
  workflowId: number;

  @Column({ default: false })
  isCompleted: boolean;

  @ManyToOne(() => Workflow, (workflow) => workflow.step)
  workflow: Workflow;

  @OneToMany(() => Task, (task) => task.currentStep)
  task: Task[];
}
