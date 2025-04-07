import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Workflow } from 'src/workflow/workflow.entity';
import { Task } from 'src/task/task.entity';

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

  @ManyToOne(() => Workflow, (workflow) => workflow.steps, {
    onDelete: 'CASCADE',
  })
  workflow: Workflow;

  @OneToMany(() => Task, (task) => task.currentStep)
  tasks: Task[];
}
