import { Injectable } from '@nestjs/common';
import {Task, TaskStatus} from './task.model';
import { v1 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';

@Injectable()
export class TasksService {
  private tasks:Task[] = [];


  getAllTasks():Task[] {
    return this.tasks;
  }

  
  getTaskWithFilters(filterDto:GetTasksFilterDto) :Task[] {
    const  {status, search} = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter(task => task.status == status);
    }

    if (search) {
      tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
    }
    return tasks;
  }

  getTaskById(id: string) {
    return this.tasks.find(task => task.id === id);
  }

  removeTaskById (id: string) {
   const index = this.tasks.findIndex(task => task.id === id);
   return this.tasks.splice(index,1)
  }

  createTask(createTaskDto: CreateTaskDto): Task {

    const {title, description} = createTaskDto;

    const task:Task = { // 因為task係type Task，所以return type都係Task
        id: uuid(),
        title,
        description,
        status: TaskStatus.OPEN,
    }

    this.tasks.push(task);
    return task; 
  }

  updateTaskStatus(id: string, status: TaskStatus):Task {
     const task = this.tasks.find(task => task.id === id)
     task.status = status; 
     return task
  }
}
