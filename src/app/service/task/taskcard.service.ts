import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataSourceChangedEventArgs, DataStateChangeEventArgs } from '@syncfusion/ej2-angular-kanban'
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from 'src/app/models/task.models';

@Injectable()
export class TasksCardService extends Subject<DataStateChangeEventArgs> {
    private BASE_URL = 'http://localhost:3000/v1/tasks'
    authToken = localStorage.getItem('authToken');

    reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': JSON.parse(this.authToken!),
      });

    constructor(private http: HttpClient) {
        super();
    }

    

    protected getData(): Observable<DataStateChangeEventArgs> {
        return this.http
           .get(`${this.BASE_URL}`, {
            headers:this.reqHeader
          })
           .pipe(map((response: any) => (<any>{
            result: response
        })))
        .pipe((data: any) => {
            return data;
        });
    }

    public execute(): void {
        this.getData().subscribe(x => super.next(x));
    }

    /** POST: add a new record  to the server */
    addCard(state: DataSourceChangedEventArgs): Observable<Task> {
        return this.http.post<any>(this.BASE_URL, state.addedRecords[0], {
            headers:this.reqHeader
        });
    }

    /** DELETE: delete the record from the server */
    deleteCard(state: any): Observable<any> {
        const id = state.deletedRecords[0]._id;
        const url = `${this.BASE_URL}/${id}`;
        return this.http.delete<any>(url, {
            headers:this.reqHeader
        });
    }

    /** PUT: update the record on the server */
    updateCard(state: DataSourceChangedEventArgs): Observable<any> {
        //console.log(state.changedRecords[0]);
        console.log(state.changedRecords[0]);
        return this.http.put(`${this.BASE_URL}/update`, state.changedRecords[0], {
            headers:this.reqHeader
        });
    }
}