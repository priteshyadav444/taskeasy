import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from 'src/app/models/task.models';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app.state';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-angular-kanban';
import { Project } from 'src/app/models/projects.models';
import { TaskState } from 'src/app/component/task/state/task.state';

@Injectable({ providedIn: 'root' })
export class TasksService {

  apiUrl = 'http://localhost:3000/v1/tasks';
  //  apiUrl = 'https://api-taskeasy.onrender.com/v1/tasks';

  authToken = localStorage.getItem('authToken');
  constructor(private http: HttpClient, private store: Store<AppState>) {}
  
  
  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-auth-token': JSON.parse(this.authToken!),
  });

  addTask(task: Task,pid:string): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/${pid}`, task,{
      headers:this.reqHeader
    });
  }

  // addTask(task: Task, pid: string): Observable<Task> {
  //   return this.http.post<Task>(`${this.BASE_URL}/${pid}`, task, {
  //     headers: this.reqHeader,
  //   });
  // }

  getAll(pid: string): Observable<TaskState> {
    return this.http
      .get<TaskState>(`${this.apiUrl}/${pid}`, {
        headers: this.reqHeader,
      })
      .pipe(
        map((data) => {
          const tasks: Task[] = data.tasks;
          const projectDetails:Project = { ...data.projectDetails};
          const result = { tasks, projectDetails };
          return result;
        })
      );
  }

  


}
