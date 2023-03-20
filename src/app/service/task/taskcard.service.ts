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
import { addTask } from 'src/app/component/task/state/task.action';
import { getTasks } from 'src/app/component/task/state/task.selector';
import { Task } from 'src/app/models/task.models';

@Injectable()
export class TasksCardService extends Subject<DataStateChangeEventArgs> {
  activateRouter$ = new Subject();
  activeRouterId: any;
  pid = new BehaviorSubject('');
  // private BASE_URL = 'http://localhost:3000/v1/tasks'
  private BASE_URL = 'https://api-taskeasy.onrender.com/v1/tasks';
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
    return this.store
      .select(getTasks)
      .pipe(
        map(
          (response: Task[]) =>
            <any>{
              result: response,
            }
        )
      )
      .pipe((data: any) => {
        return data;
      });

    // return this.http
    //        .get(`${this.BASE_URL}/${this.pid.value}`, {
    //         headers:this.reqHeader
    //       })
    //        .pipe(map((response: Task[]) => (<any>{
    //         result: response
    //     })))
    //     .pipe((data: any) => {
    //       console.log(data)
    //         return data;
    //     });
  }

  public execute(state: any): void {
    console.log('execute');
    this.getData(state).subscribe((x) => {
      // x['name'] = 'dataBinding';
      // x['json'] = [];
      // console.log(x);
      super.next(x);
    });
  }

  /** POST: add a new record  to the server */
  addCard(state: DataSourceChangedEventArgs, pid: string): Observable<Task> {
    return this.http.post<any>(this.BASE_URL, state.addedRecords[0], {
      headers: this.reqHeader,
    });
  }

  /** DELETE: delete the record from the server */
  deleteCard(state: any, pid: string): Observable<any> {
    const id = state.deletedRecords[0]._id;
    const url = `${this.BASE_URL}/${pid}/${id}`;
    return this.http.delete<any>(url, {
      headers: this.reqHeader,
    });
  }

  /** PUT: update the record on the server */
  updateCard(state: DataSourceChangedEventArgs, pid: string): Observable<any> {
    //console.log(state.changedRecords[0]);
    return this.http.put(
      `${this.BASE_URL}/update/${pid}`,
      state.changedRecords[0],
      {
        headers: this.reqHeader,
      }
    );
  }
}
