import {
  Body,
  Controller,
  Post,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Task } from './task.entity';

@ApiTags('Task')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: '할 일 생성' })
  @ApiResponse({
    status: 201,
    description: '할 일이 성공적으로 생성됨',
    type: Task,
  })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(createTaskDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: '할 일 수정' })
  @ApiParam({ name: 'id', description: '할 일 ID', example: 1 })
  @ApiResponse({
    status: 200,
    description: '할 일이 성공적으로 수정됨',
    type: Task,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '할 일 삭제' })
  @ApiParam({ name: 'id', description: '할 일 ID', example: 1 })
  @ApiResponse({ status: 200, description: '할 일이 성공적으로 삭제됨' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.taskService.remove(id);
  }

  @Post(':id/duplicate')
  @ApiOperation({ summary: '할 일 복제' })
  @ApiParam({ name: 'id', description: '복제할 원본 할 일 ID', example: 1 })
  @ApiResponse({
    status: 201,
    description: '복제된 할 일이 반환됨',
    type: Task,
  })
  async duplicate(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.duplicate(id);
  }
}
