import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app-store/app.state";
import { Injectable } from '@angular/core';
import { addProjectStart, addProjectSucess, loadAllProjects, loadProjectsSuccess } from "./project.action";
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs';
import { of } from 'rxjs';
import { ProjectService } from "src/app/service/project/project.service";
import { Project } from "src/app/models/projects.models";


@Injectable()
export class ProjectEffects {
  constructor(private router:Router,private actions$: Actions, private store:Store<AppState>, private projectService:ProjectService) {}

  projectCreate$ = createEffect( () => {
    return this.actions$.pipe(
      ofType(addProjectStart),
      mergeMap((action) => {
        return this.projectService.createProject(action.project).pipe(
          map((data) => {
            const project = {  ...action.project, id:data.id };
             return addProjectSucess({ project });
          }),
          catchError((errResp) => {
            return of();
          })
        );
      })
    );
 });

 loadAllProject$ = createEffect(() =>{
  return this.actions$.pipe(
    ofType(loadAllProjects),
    mergeMap((action) => {
      return this.projectService.getAllProjects().pipe(
        map((projects)=>{
          return loadProjectsSuccess({ projects });
        })
      )
    })
  )
})

}
