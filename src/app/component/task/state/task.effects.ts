import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, take, tap } from 'rxjs';
import { AppState } from 'src/app/app-store/app.state';
import { Project } from 'src/app/models/projects.models';
import { Task } from 'src/app/models/task.models';
import { TasksService } from 'src/app/service/task/task.services';
import { resetProjectState } from '../../dashboard/state/project.action';
import { setLoadingSpinner } from '../../shared/state/Shared/shared.actions';
import { HomeComponent } from '../home/home.component';
import {
  addTask,
  addTaskSuccess,
  deleteTask,
  deleteTaskSuccess,
  loadAllData,
  loadDataSuccess,
  updateTask,
  updateTaskSuccess,
} from './task.action';
import * as sharedActions from 'src/app/component/shared/state/Shared/shared.actions';
import { UiService } from 'src/app/service/ui.service';

@Injectable()
export class TaskEffects {
  constructor(
    private actions$: Actions,
    private taskServices: TasksService,
    private home: HomeComponent,
    private store: Store<AppState>,
    private uiService: UiService
  ) {}

  loadAllData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadAllData),
      mergeMap((action) => {
        this.store.dispatch(setLoadingSpinner({ status: true }));
        return this.taskServices.getAll(action.pid).pipe(
          map((data) => {
            const tasks: Task[] = data.tasks;
            const projectDetails: Project = data.projectDetails;
            return loadDataSuccess({ tasks, projectDetails });
          })
        );
      }),
      catchError((err) => {
        const errMsg = this.uiService.parseErrorMessage(err);
        return of(sharedActions.setErrorMessage({ error: errMsg }));
      })
    );
  });

  addTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addTask),
      mergeMap((action) => {
        return this.taskServices.addTask(action.task, action.pid).pipe(
          map((data) => {
            const task = { ...data };
            const messageData = {
              severity: 'success',
              summary: task?.title,
              detail: 'Task Added!',
            };
            this.taskServices.showMessage(messageData);
            return addTaskSuccess({ task });
          }),
          catchError((err) => {
            const errMsg = this.uiService.parseErrorMessage(err);
            return of(sharedActions.setErrorMessage({ error: errMsg }));
          })
        );
      })
    );
  });

  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateTask),
      mergeMap((action) => {
        return this.taskServices.updateTask(action.task, action.pid).pipe(
          map((data) => {
            const task = { ...action.task };
            const messageData = {
              severity: 'success',
              summary: action.task.title,
              detail: 'Task Updated!',
            };
            this.taskServices.showMessage(messageData);
            return updateTaskSuccess({ task });
          }),
          catchError((err) => {
            const errMsg = this.uiService.parseErrorMessage(err);
            return of(sharedActions.setErrorMessage({ error: errMsg }));
          })
        );
      })
    );
  });

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteTask),
      mergeMap((action) => {
        return this.taskServices.deleteTask(action.task, action.pid).pipe(
          map((data) => {
            const task = { ...action.task };
            const messageData = {
              severity: 'success',
              summary: action.task.title,
              detail: data?.success[0].msg,
            };
            this.taskServices.showMessage(messageData);
            return deleteTaskSuccess({ task });
          }),
          catchError((err) => {
            const errMsg = this.uiService.parseErrorMessage(err);
            return of(sharedActions.setErrorMessage({ error: errMsg }));
          })
        );
      })
    );
  });

  kanbanUpdate$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[addTaskSuccess, updateTaskSuccess, deleteTaskSuccess]),
        tap((action) => {
          this.home.update();
          // reset to reload project on dashboard page
          this.store.dispatch(
            resetProjectState({ resetProjectLoadedState: false })
          );
        })
      );
    },
    { dispatch: false }
  );
}
