import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataSourceChangedEventArgs, DataStateChangeEventArgs } from '@syncfusion/ej2-angular-kanban'
import { Observable, BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from 'src/app/models/task.models';

@Injectable()
export class TasksCardService extends Subject<DataStateChangeEventArgs> {

    
    activateRouter$ = new Subject();
    activeRouterId: any;
    pid = new BehaviorSubject("")
    private BASE_URL = 'http://localhost:3000/v1/tasks'
    // private BASE_URL ='https://api-taskeasy.onrender.com/v1/tasks'
    authToken = localStorage.getItem('authToken');

    reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': JSON.parse(this.authToken!),
      });

    constructor(private http: HttpClient) {
        super();
        this.activateRouter$.subscribe(val => {
            if (val) {
                this.activeRouterId = val;
            }
        });
    }

    
    public setId(id:any):void{
      this.pid.next(id)
    }
    protected getData(pid:string): Observable<DataStateChangeEventArgs> {
        return this.http
           .get(`${this.BASE_URL}/${pid}`, {
            headers:this.reqHeader
          })
           .pipe(map((response: Task[]) => (<any>{
            result: response
        })))
        .pipe((data: any) => {
            return data;
        });
    }

    getAllTasks(pid:string): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.BASE_URL}/${pid}`,{
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
    
      addTask(task: Task,pid:string): Observable<Task> {
        return this.http.post<Task>(`${this.BASE_URL}/${pid}`, task,{
          headers:this.reqHeader
        });
      }

    public execute(pid:string): void {
        this.getData(pid).subscribe(x => super.next(x));
    }

    /** POST: add a new record  to the server */
    addCard(state: DataSourceChangedEventArgs, pid:string): Observable<Task> {
        return this.http.post<any>(this.BASE_URL, state.addedRecords[0], {
            headers:this.reqHeader
        });
    }

    /** DELETE: delete the record from the server */
    deleteCard(state: any, pid:string): Observable<any> {
        const id = state.deletedRecords[0]._id;
        const url = `${this.BASE_URL}/${pid}/${id}`;
        return this.http.delete<any>(url, {
            headers:this.reqHeader
        });
    }

    /** PUT: update the record on the server */
    updateCard(state: DataSourceChangedEventArgs, pid:string): Observable<any> {
        //console.log(state.changedRecords[0]);
        return this.http.put(`${this.BASE_URL}/update/${pid}`, state.changedRecords[0], {
            headers:this.reqHeader
        });
    }
}