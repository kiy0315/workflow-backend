import { IsString, IsBoolean, IsInt, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: '할 일 제목',
    example: '기획안 초안 작성',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: '할 일 설명',
    example: '초안 작성 후 팀장에게 공유',
  })
  @IsString()
  description: string;

  @ApiPropertyOptional({
    description: '완료 여부 (기본값: false)',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @ApiProperty({
    description: '할 일이 속한 워크플로우 ID',
    example: 1,
  })
  @IsInt()
  workflowId: number;

  @ApiProperty({
    description: '할 일이 속한 스텝 ID',
    example: 2,
  })
  @IsInt()
  currentStepId: number;

  @ApiPropertyOptional({
    description: '할 일 담당자 유저 ID',
    example: 3,
  })
  @IsOptional()
  @IsInt()
  assignedToId?: number;
}
