import { createAction, props } from "@ngrx/store";
import { Task } from "src/app/Models/task.models";

export const ADD_TASK_INITIATE = "on add task start";
export const ADD_TASK_SUCCESS = "on add task success"


export const addTask = createAction(ADD_TASK_INITIATE, props<{task: Task}>());
export const addTaskSuccess = createAction(ADD_TASK_SUCCESS, props<{task: Task}>()); 