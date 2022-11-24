import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { TasksService } from 'src/app/service/task/task.services';
import { TasksCardService } from 'src/app/service/task/taskcard.service';
import {
  addTask,
  addTaskSuccess,
  loadAllTasks,
  loadTasksSuccess,
} from './task.action';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private taskServices: TasksService, private service: TasksCardService) {}

  addTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addTask),
      mergeMap((action) => {
        return this.taskServices.addTask(action.task,action.pid).pipe(
          map((data) => {
            const task = { ...action.task };
            this.service.execute(action.pid);
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
        return this.service.getAllTasks(action.pid).pipe(
          map((tasks) => {
            return loadTasksSuccess({ tasks });
          })
        );
      })
    );
  });
}
