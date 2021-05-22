import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import {Task, TaskStatus} from './task.model'
import {CreateTaskDto} from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import {TaskStatusValidationPipe} from './pipes/task-status-validation.pipe'
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTaskWithFilters(filterDto)
    } else {
      return this.tasksService.getAllTasks()
    }

  }
 /* 
  @Get()
  getAllTasks():Task[] {
    return this.tasksService.getAllTasks();
  }
*/
  @Get('/:id')
  getTaskById(@Param('id') id: string) {
      return this.tasksService.getTaskById(id);    
  }

  @Delete(':id')
  removeTaskById(@Param('id') id: string) {
    return this.tasksService.removeTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
 @Body() createTaskDto: CreateTaskDto
  ):Task {
    return this.tasksService.createTask(createTaskDto)
  }
  
  @Patch(':id/status')
  updateTaskStatus(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
    return this.tasksService.updateTaskStatus(id,status)
  }

  // Post有兩種接受data的方法
  // req.body 同 req.query
}
