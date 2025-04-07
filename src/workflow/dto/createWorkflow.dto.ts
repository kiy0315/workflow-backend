import { IsString, IsInt, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWorkflowDto {
  @ApiProperty({
    description: '워크플로우 이름',
    example: '기획안 작성 프로세스',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '워크플로우 설명',
    example: '기획안 작성 단계를 나타내는 워크플로우입니다.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: '워크플로우 생성자 ID',
    example: 1,
  })
  @IsInt()
  createdById: number;

  @ApiPropertyOptional({
    description: '워크플로우 생성 시간 (기본값은 서버 시간)',
    example: '2025-04-07T12:34:56.789Z',
  })
  @IsOptional()
  createdAt?: Date;
}
