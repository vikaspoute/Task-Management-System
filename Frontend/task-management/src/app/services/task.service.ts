import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import urlList from '../models/Urls';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  public addTask(task: Task) {
    return this.http.post(urlList.task.CREATE_TASK, task);
  }

  public removeTask(taskId: any) {
    return this.http.delete(urlList.task.DELETE_TASKS + `${taskId}`);
  }

  public getAllTasks() {
    return this.http.get(urlList.task.GET_TASKS);
  }

  public updateTask(task: Task) {
    return this.http.put(urlList.task.UPDATE_TASKS, task);
  }

  public getTaskByTaskId(taskId:any) {
    return this.http.get(urlList.task.GET_TASK_BY_ID+`/${taskId}`);
  }
}
