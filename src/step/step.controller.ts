import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
  } from '@nestjs/common';
  import { StepService } from './step.service';
  import { CreateStepDto } from './dto/createStep.dto';
  import { UpdateStepDto } from './dto/updateStep.dto';
  import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
  import { Step } from './step.entity';
  
  @ApiTags('Step') // Swagger에서 섹션 이름
  @Controller('steps')
  export class StepController {
    constructor(private readonly stepService: StepService) {}
  
    @Post()
    @ApiOperation({ summary: '새로운 Step 생성' })
    @ApiResponse({ status: 201, description: 'Step 생성 성공', type: Step })
    create(@Body() createStepDto: CreateStepDto): Promise<Step> {
      return this.stepService.create(createStepDto);
    }
  
    @Get()
    @ApiOperation({ summary: '모든 Step 조회' })
    @ApiResponse({ status: 200, description: 'Step 리스트 반환', type: [Step] })
    findAll(): Promise<Step[]> {
      return this.stepService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: '특정 Step 조회' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Step 반환', type: Step })
    findOne(@Param('id') id: number): Promise<Step> {
      return this.stepService.findOne(id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: '특정 Step 수정' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: '수정된 Step 반환', type: Step })
    update(
      @Param('id') id: number,
      @Body() updateStepDto: UpdateStepDto,
    ): Promise<Step> {
      return this.stepService.update(id, updateStepDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: '특정 Step 삭제' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Step 삭제 성공' })
    remove(@Param('id') id: number): Promise<void> {
      return this.stepService.remove(id);
    }
  
    @Post(':id/duplicate-to/:workflowId')
    @ApiOperation({ summary: 'Step을 다른 워크플로우로 복제' })
    @ApiParam({ name: 'id', type: Number, description: '복제할 Step ID' })
    @ApiParam({ name: 'workflowId', type: Number, description: '복제 대상 워크플로우 ID' })
    @ApiResponse({ status: 201, description: '복제된 Step 반환', type: Step })
    duplicateStepToWorkflow(
      @Param('id') stepId: number,
      @Param('workflowId') toWorkflowId: number,
    ): Promise<Step> {
      return this.stepService.duplicateStepToWorkflow(stepId, toWorkflowId);
    }
  }
  