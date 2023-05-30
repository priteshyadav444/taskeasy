import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  DataSourceChangedEventArgs,
  DataStateChangeEventArgs,
} from '@syncfusion/ej2-angular-kanban';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/app-store/app.state';
import { getTasks } from 'src/app/component/task/state/task.selector';
import { Task } from 'src/app/models/task.models';

@Injectable()
export class TasksCardService extends Subject<DataStateChangeEventArgs> {
  activateRouter$ = new Subject();
  activeRouterId: any;
  pid = new BehaviorSubject('');

  authToken = localStorage.getItem('authToken');

  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-auth-token': JSON.parse(this.authToken!),
  });

  constructor(private http: HttpClient, private store: Store<AppState>) {
    super();
    this.activateRouter$.subscribe((val) => {
      if (val) {
        this.activeRouterId = val;
        this.setId(val);
      }
    });
  }

  public setId(id: any): void {
    this.pid.next(id);
  }

  protected getData(
    state: DataStateChangeEventArgs
  ): Observable<DataStateChangeEventArgs> {
    // return this.http
    //   .get<TaskState>(`${'https://api-taskeasy.onrender.com/v1/tasks'}/${'6474f491a8010e120223428f'}`, {
    //     headers: this.reqHeader,
    //   })
    //   .pipe(map((response: any) =>  {
    //     console.log("response",response.tasks);
    //     return (<any>{
    //       result: response.tasks
    //     })
    //   }
    // ))
    // .pipe((data: any) => data);
    return this.store
      .select(getTasks)
      .pipe(
        map(
          (response: Task[]) => {
            console.log("response",response)
            return <any>{
              result: response,
            }

          }
        )
      )
      .pipe((data: any) => {
        return data;
      });
    // return this.http
//     // .get(`${'https://ej2services.syncfusion.com/production/web-services/api/Kanban'}`)
//     .get<TaskState>(`${'https://api-taskeasy.onrender.com/v1/tasks'}/${this.activeRouterId}`, {
//         headers: this.reqHeader,
//       })
//     .pipe(map((response: any) => { 
//       console.log("response",response);
//       return (<any>{
//       result: response.tasks
//       })
//     }))
//  .pipe((data: any) => data);
  }

  public execute(state: any): void {
    this.getData(state).subscribe((x) => {
      super.next(x);
    });
  }
}
