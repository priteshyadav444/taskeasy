import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs';
import { Project } from 'src/app/models/projects.models';
import { Task } from 'src/app/models/task.models';
import { TasksService } from 'src/app/service/task/task.services';
import { TasksCardService } from 'src/app/service/task/taskcard.service';
import { HomeComponent } from '../home/home.component';
import {
  addTask,
  addTaskSuccess,
  loadAllData,
  loadDataSuccess,
  updateTask,
  updateTaskSuccess,
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
            const task = { ...data};
            return addTaskSuccess({ task });
          })
        );
      })
    );
  });

  loadAllData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadAllData),
      mergeMap((action) => {
        return this.taskServices.getAll(action.pid).pipe(
          map((data) => {
            console.log(data)
            const tasks: Task[] = data.tasks;
            const projectDetails:Project = data.projectDetails;
            return loadDataSuccess({ tasks,projectDetails });
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
            return updateTaskSuccess({ task });
          })
        );
      })
    );
  });

  kanbanUpdate$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[addTaskSuccess, updateTaskSuccess]),
        tap((action) => { 
          console.log("kanban update")
          this.home.update();
          
        })
      );
    },
    { dispatch: false }
  );

}
