import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { TasksService } from "src/app/service/task.services";
import { addTask, addTaskSuccess } from "./task.action";

@Injectable()
export class TaskEffects
{
    constructor(private actions$: Actions, private taskServices: TasksService) {}
    
    addTask$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(addTask),
          mergeMap((action) => {
            return this.taskServices.addTask(action.task).pipe(
              map((data) => {
                const task = { ...action.task, id: data.id };
                return addTaskSuccess({ task });
              })
            );
          })
        );
      });
}
