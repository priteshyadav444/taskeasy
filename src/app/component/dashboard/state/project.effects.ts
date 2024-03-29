import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app.state';
import { Injectable } from '@angular/core';
import {
  addProjectStart,
  addProjectSucess,
  deleteProjectStart,
  deleteProjectSuccess,
  loadAllProjects,
  loadProjectsSuccess,
  updateProjectStart,
  updateProjectSucess,
} from './project.action';
import { catchError, map, mergeMap, tap } from 'rxjs';
import { of } from 'rxjs';
import { ProjectService } from 'src/app/service/project/project.service';
import { Project } from 'src/app/models/projects.models';
import { setLoadingSpinner } from 'src/app/component/shared/state/Shared/shared.actions';
import { loadDataSuccess, resetTasks } from '../../task/state/task.action';
import * as sharedActions from 'src/app/component/shared/state/Shared/shared.actions';
import { UiService } from 'src/app/service/ui.service';

@Injectable()
export class ProjectEffects {
  totalCompletedTask: any = 0;
  totalTasks: any = 0;
  idx: any = 0;
  data: Project[] = [];
  constructor(
    private router: Router,
    private actions$: Actions,
    private store: Store<AppState>,
    private projectService: ProjectService,
    private uiService: UiService
  ) {}

  projectCreate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addProjectStart),
      mergeMap((action) => {
        return this.projectService.createProject(action.project).pipe(
          map((data) => {
            const project = {
              ...action.project,
              _id: data._id,
              ...data,
            };
            this.uiService.dispatchSuccessMessage(
              'Woohoo! Your project has officially created.'
            );
            return addProjectSucess({ project });
          }),
          catchError((err) => {
            const errMsg = this.uiService.parseErrorMessage(err);
            this.uiService.dispatchLoadingSpinner(false);
            return of(sharedActions.setErrorMessage({ error: errMsg }));
          })
        );
      })
    );
  });

  loadAllProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadAllProjects),
      mergeMap((action) => {
        this.store.dispatch(setLoadingSpinner({ status: true }));
        return this.projectService.getAllProjects().pipe(
          map((projects) => {
            this.data = [];
            if (projects != null) {
              projects.forEach((ele) => {
                this.totalCompletedTask = 0;
                this.totalTasks = 0;
                this.idx = 0;

                ele.tasks.forEach((value) => {
                  if (value.task_status == 'done') this.totalCompletedTask++;
                  this.totalTasks++;
                });

                const projectele = {
                  ...ele,
                  total_completed_tasks: this.totalCompletedTask,
                  total_tasks: this.totalTasks,
                };
                this.data.push(projectele);
                this.idx++;
              });
            }
            this.idx = 0;
            projects = this.data;
            if (this.data?.length > 0) {
              this.uiService.dispatchSuccessMessage(
                'Hooray! Your all project has been loaded.'
              );
            }
            return loadProjectsSuccess({ projects });
          })
        );
      })
    );
  });

  deleteProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteProjectStart),
      mergeMap((action) => {
        return this.projectService.deleteProject(action.pid).pipe(
          map((data) => {
            this.uiService.dispatchSuccessMessage(
              'Project deleted successfully!'
            );
            return deleteProjectSuccess({ pid: action.pid });
          }),
          catchError((err) => {
            const errMsg = this.uiService.parseErrorMessage(err);
            this.uiService.dispatchLoadingSpinner(false);
            return of(sharedActions.setErrorMessage({ error: errMsg }));
          })
        );
      })
    );
  });

  updateProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateProjectStart),
      mergeMap((action) => {
        return this.projectService.updateProject(action.project).pipe(
          map((data) => {
            this.uiService.dispatchSuccessMessage(
              'Bravo! Your project has been updated flawlessly.'
            );
            return updateProjectSucess({
              project: { ...action?.project, ...data },
            });
          }),
          catchError((err) => {
            const errMsg = this.uiService.parseErrorMessage(err);
            this.uiService.dispatchLoadingSpinner(false);
            return of(sharedActions.setErrorMessage({ error: errMsg }));
          })
        );
      })
    );
  });

  setLoader$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          ...[
            deleteProjectSuccess,
            addProjectSucess,
            updateProjectSucess,
            loadProjectsSuccess,
            loadDataSuccess,
          ]
        ),
        tap((action) => {
          this.uiService.dispatchLoadingSpinner(false);
        })
      );
    },
    { dispatch: false }
  );
}
