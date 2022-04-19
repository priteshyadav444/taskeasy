import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from 'src/app/Models/task.models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app.state';

@Injectable({ providedIn: 'root' })
export class TasksService {
  apiUrl = 'http://localhost:3000/v1/tasks/';
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }
}
