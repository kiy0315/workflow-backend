import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateWorkflowDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  createdById: number;

  @IsOptional()
  createdAt?: Date;
}
