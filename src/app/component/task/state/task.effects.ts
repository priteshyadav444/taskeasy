import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, tap } from 'rxjs';
import { AppState } from 'src/app/app-store/app.state';
import { Project } from 'src/app/models/projects.models';
import { Task } from 'src/app/models/task.models';
import { TasksService } from 'src/app/service/task/task.services';
import { TasksCardService } from 'src/app/service/task/taskcard.service';
import { setErrorMessage } from '../../shared/state/Shared/shared.actions';
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

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private taskServices: TasksService, private service: TasksCardService, private home:HomeComponent,  private store: Store<AppState>) {}
  
  loadAllData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadAllData),
      mergeMap((action) => {
        return this.taskServices.getAll(action.pid).pipe(
          map((data) => {
            const tasks: Task[] = data.tasks;
            const projectDetails:Project = data.projectDetails;
           
            return loadDataSuccess({ tasks,projectDetails });
          })
        );
      })
    );
  });

  addTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addTask),
      mergeMap((action) => {
        return this.taskServices.addTask(action.task,action.pid).pipe(
          map((data) => {
            const task = { ...data};
            const messageData = { severity:'success', summary: 'Success', detail: 'Task Added!'}
            this.taskServices.showMessage(messageData);
            return addTaskSuccess({ task });
          })
        );
      })
    );
  });


  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateTask),
      mergeMap((action) => {
        return this.taskServices.updateTask(action.task,action.pid).pipe(
          map((data) => {
            const task = { ...action.task};
            const messageData = { severity:'success', summary: action.task.title, detail: 'Task Updated!'}
            this.taskServices.showMessage(messageData);
            return updateTaskSuccess({ task });
          })
        );
      })
    );
  });

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteTask),
      mergeMap((action) => {
        return this.taskServices.deleteTask(action.task,action.pid).pipe(
          map((data) => {
            const task = { ...action.task};
            const messageData = { severity:'error', summary: 'Success', detail: 'Task Deleted!'}
            this.taskServices.showMessage(messageData);
            return deleteTaskSuccess({ task });
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
          
        })
      );
    },
    { dispatch: false }
  );

}
