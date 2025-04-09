import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStepDto {
  @ApiProperty({
    example: '초기 단계',
    description: 'Step의 이름',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 1,
    description: 'Step의 순서 (숫자)',
  })
  @IsNotEmpty()
  @IsNumber()
  order: number;

  @ApiProperty({
    example: 5,
    description: '연결할 워크플로우의 ID',
  })
  @IsNotEmpty()
  @IsNumber()
  workflowId: number;
}
