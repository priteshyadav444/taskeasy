import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from 'src/app/models/projects.models';
import { getToken } from 'src/app/component/auth/state/auth.selector';
import { AppState } from 'src/app/app-store/app.state';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  authToken:any
  reqHeader:any

  // apiUrl = 'http://localhost:3000/v1/users/project';
  apiUrlProject = 'http://localhost:3000/v1/users/project';
  apiUrl = 'https://api-taskeasy.onrender.com/v1/users/project'
  constructor(private http: HttpClient, private store:Store<AppState>) {
    this.reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': JSON.parse(localStorage.getItem('authToken')),
    });
  }


  getToken() {
    return this.reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': JSON.parse(localStorage.getItem('authToken')),
    });
  }

  createProject(project:Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl,project,{
      headers: this.getToken()
    })
  }
  deleteProject(pid:String):Observable<any>{
    return this.http.delete<any>(this.apiUrlProject,{headers: this.getToken()}).pipe(map((data)=>{
      return data;
    }))
  }


  // async getToken(): Promise < string > {
  //   return await localStorage.getItem('authToken');
  // }
  
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl,{
      headers: this.getToken()
    }).pipe(
      map((data) => {
        const projects: Project[] = [];
        for (let key in data) {
          projects.push({ ...data[key] });
        }
        return projects;
      })
    );
  }
}
