import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class TasksService {
    constructor(private http: HttpClient) {}
<<<<<<< HEAD
    taskUrl = "http://localhost:3000/v1/tasks"
=======
    taskUrl = "https://api-taskeasy.herokuapp.com/v1/tasks"
>>>>>>> dec39a0cdbed4cd11ecb6ce5d2436affa3388df5

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