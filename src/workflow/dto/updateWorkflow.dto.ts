import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkflowDto } from './createWorkflow.dto';

export class UpdateWorkflowDto extends PartialType(CreateWorkflowDto) {}
