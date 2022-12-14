import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs';
import { TasksService } from 'src/app/service/task/task.services';
import { TasksCardService } from 'src/app/service/task/taskcard.service';
import { HomeComponent } from '../home/home.component';
import {
  addTask,
  addTaskSuccess,
  loadAllTasks,
  loadTasksSuccess,
} from './task.action';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private taskServices: TasksService, private service: TasksCardService, private home:HomeComponent) {}

  addTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addTask),
      mergeMap((action) => {
        return this.taskServices.addTask(action.task,action.pid).pipe(
          map((data) => {
            const task = { ...action.task };
            return addTaskSuccess({ task });
          })
        );
      })
    );
  });

  loadAllTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadAllTasks),
      mergeMap((action) => {
        return this.taskServices.getAllTasks(action.pid).pipe(
          map((tasks) => {
            return loadTasksSuccess({ tasks });
          })
        );
      })
    );
  });

  kanbanUpdate$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[addTaskSuccess]),
        tap((action) => { 
          console.log("kanban update")
          this.home.update();
          
        })
      );
    },
    { dispatch: false }
  );

}
