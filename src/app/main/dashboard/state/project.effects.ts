import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app-store/app.state";
import { Injectable } from '@angular/core';
import { addProjectStart, addProjectSucess } from "./project.action";
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs';
import { of } from 'rxjs';
import { ProjectService } from "src/app/service/project/project.service";


@Injectable()
export class ProjectEffects {
  constructor(private router:Router,private actions$: Actions, private store:Store<AppState>, private projectService:ProjectService) {}

  projectCreate$ = createEffect( () => {
    return this.actions$.pipe(
      ofType(addProjectStart),
      mergeMap((action) => {
        return this.projectService.createProject(action.title).pipe(
          map((data) => {
            const res = { projects: { title: "dad"}}
            return addProjectSucess(res);
          }),
          catchError((errResp) => {
            return of();
          })
        );
      })
    );
 });

}
