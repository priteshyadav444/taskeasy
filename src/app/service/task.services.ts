import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from 'src/app/Models/task.models';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app.state';

@Injectable({ providedIn: 'root' })
export class TasksService {
  apiUrl = 'http://localhost:3000/v1/tasks/';
  authToken = localStorage.getItem('authToken');
  constructor(private http: HttpClient, private store: Store<AppState>) {}
  
  
  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-auth-token': JSON.parse(this.authToken!),
  });

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task,{
      headers:this.reqHeader
    });
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl,{
      headers:this.reqHeader
    }).pipe(
      map((data) => {
        const tasks: Task[] = [];
        for (let key in data) {
          tasks.push({ ...data[key], id: key });
        }
        return tasks;
      })
    );
  }
}
