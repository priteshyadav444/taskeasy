import { Injectable } from '@angular/core';
import { ProjectState } from 'src/app/main/dashboard/state/project.state';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  authToken = localStorage.getItem('authToken');
  apiUrl = 'http://localhost:3000/v1/users/project';
  constructor(private http: HttpClient) {}
  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-auth-token': JSON.parse(this.authToken!),
  });

  createProject(title: string): Observable<ProjectState> {
    return this.http.post<ProjectState>(this.apiUrl,{
      "project_title":title,
    },{
      headers:this.reqHeader
    })
  }
}
