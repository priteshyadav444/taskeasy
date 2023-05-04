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
  }

  public execute(state: any): void {
    this.getData(state).subscribe((x) => {
      super.next(x);
    });
  }
}
