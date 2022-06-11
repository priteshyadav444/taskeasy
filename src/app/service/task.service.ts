import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class TasksService {
    constructor(private http: HttpClient) {}
    taskUrl = "http://localhost:3000/v1/tasks"

    getTasks(): Observable<Task[]> {
      return this.http
        .get<Task[]>(this.taskUrl)
        .pipe(
          map((data) => {
            const tasks: Task[] = [];
            for (let key in data) {
                tasks.push({ ...data[key]});
            }
            return tasks;
          })
        );
    }
}