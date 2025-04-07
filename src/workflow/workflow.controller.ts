import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Req,
} from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { CreateWorkflowDto } from './dto/createWorkflow.dto';
import { UpdateWorkflowDto } from './dto/updateWorkflow.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { GetUser } from 'src/common/decorators/user.decorator';

@ApiTags('Workflow')
@Controller('workflows')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Post()
  @ApiOperation({ summary: '워크플로우 생성' })
  @ApiResponse({ status: 201, description: '생성된 워크플로우 반환' })
  create(@Body() createWorkflowDto: CreateWorkflowDto, @GetUser() user: User) {
    return this.workflowService.create(createWorkflowDto, user);
  }

  @Get()
  @ApiOperation({ summary: '워크플로우 전체 조회' })
  @ApiResponse({ status: 200, description: '워크플로우 목록 반환' })
  findAll() {
    return this.workflowService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '워크플로우 단건 조회' })
  @ApiResponse({ status: 200, description: '워크플로우 상세 반환' })
  findOne(@Param('id') id: string) {
    return this.workflowService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '워크플로우 수정' })
  @ApiResponse({ status: 200, description: '수정된 워크플로우 반환' })
  update(
    @Param('id') id: string,
    @Body() updateWorkflowDto: UpdateWorkflowDto,
  ) {
    return this.workflowService.update(+id, updateWorkflowDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '워크플로우 삭제' })
  @ApiResponse({ status: 200, description: '워크플로우 삭제 성공' })
  remove(@Param('id') id: string) {
    return this.workflowService.remove(+id);
  }

  @Post(':id/duplicate')
  @ApiOperation({ summary: '워크플로우 복제' })
  @ApiResponse({ status: 201, description: '복제된 워크플로우 반환' })
  duplicate(@Param('id') id: string) {
    return this.workflowService.duplicate(+id);
  }

  @Get(':id/progress')
  @ApiOperation({ summary: '워크플로우 진행률 조회' })
  @ApiResponse({
    status: 200,
    description: '단계별 및 작업별 진행률 반환',
  })
  getProgress(@Param('id') id: string) {
    return this.workflowService.getProgress(+id);
  }
}
