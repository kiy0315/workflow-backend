import { IsInt, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskHistoryDto {
  @ApiProperty({
    description: '기록할 할 일 ID',
    example: 1,
  })
  @IsInt()
  taskId: number;

  @ApiPropertyOptional({
    description: '해당 시점의 스텝 ID (없을 수도 있음)',
    example: 3,
  })
  @IsInt()
  stepId: number;

  @ApiProperty({
    description: '이동시킨 유저 ID',
    example: 5,
  })
  @IsInt()
  movedById: number;
}
