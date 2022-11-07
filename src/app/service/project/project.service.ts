import { Injectable } from '@angular/core';
import { ProjectState } from 'src/app/main/dashboard/state/project.state';
import { Observable,map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from 'src/app/models/projects.models';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  authToken = localStorage.getItem('authToken');
  // apiUrl = 'http://localhost:3000/v1/users/project';
  apiUrl = 'https://api-taskeasy.onrender.com/v1/users/project'
  constructor(private http: HttpClient) {}
  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-auth-token': JSON.parse(this.authToken!),
  });

  createProject(project:Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl,project,{
      headers:this.reqHeader
    })
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl,{
      headers:this.reqHeader
    }).pipe(
      map((data) => {
        const projects: Project[] = [];
        for (let key in data) {
          projects.push({ ...data[key], id: key });
        }
        console.log(projects)
        return projects;
      })
    );
  }
}
