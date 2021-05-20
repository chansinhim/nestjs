import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import {Task} from './task.model'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks():Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() body) {
    console.log('body',body);

  }

  // Post有兩種接受data的方法
  // req.body 同 req.query
}
