import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { TaskHistoryService } from './taskHistory.service';
import { CreateTaskHistoryDto } from './dto/createTaskHistory.dto';
import { PaginationDto } from '../common/pagination/dto/pagination.dto';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('TaskHistory')
@Controller('task-history')
export class TaskHistoryController {
  constructor(private readonly taskHistoryService: TaskHistoryService) {}

  @Post()
  @ApiOperation({ summary: '히스토리 생성' })
  async create(@Body() createDto: CreateTaskHistoryDto) {
    return this.taskHistoryService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: '모든 히스토리 조회 (페이지네이션)' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.taskHistoryService.findAll(paginationDto);
  }

  @Get('task/:taskId')
  @ApiOperation({ summary: '특정 테스크의 히스토리 조회' })
  @ApiParam({ name: 'taskId', type: Number })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAllByTask(
    @Param('taskId') taskId: number,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.taskHistoryService.findAllByTask(taskId, paginationDto);
  }

  @Get('step/:stepId')
  @ApiOperation({ summary: '특정 스텝의 히스토리 조회' })
  @ApiParam({ name: 'stepId', type: Number })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAllByStep(
    @Param('stepId') stepId: number,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.taskHistoryService.findAllByStep(stepId, paginationDto);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: '특정 유저의 히스토리 조회' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAllByUser(
    @Param('userId') userId: number,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.taskHistoryService.findAllByUser(userId, paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '히스토리 단건 조회' })
  @ApiParam({ name: 'id', type: Number })
  async findOne(@Param('id') id: number) {
    return this.taskHistoryService.findOne(id);
  }
}
