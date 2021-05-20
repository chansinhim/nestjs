import { Injectable } from '@nestjs/common';
import {Task, TaskStatus} from './task.model';
import { v1 as uuid} from 'uuid';

@Injectable()
export class TasksService {
  private tasks:Task[] = [];


  getAllTasks():Task[] {
    return this.tasks;
  }

  createTask(title: string, description: string): Task {

    const task:Task = { // 因為task係type Task，所以return type都係Task
        id: uuid(),
        title,
        description,
        status: TaskStatus.OPEN,
    }

    this.tasks.push(task);
    return task; 
  }
}
