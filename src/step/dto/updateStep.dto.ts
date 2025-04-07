import { PartialType } from '@nestjs/mapped-types';
import { CreateStepDto } from './createStep.dto';
import { IsOptional, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateStepDto extends PartialType(CreateStepDto) {
  @ApiPropertyOptional({
    example: true,
    description: 'Step 완료 여부',
  })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}
