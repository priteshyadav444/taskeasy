import { createAction, props } from "@ngrx/store";
import { Task } from "src/app/models/task.models";

export const ADD_TASK_INITIATE = "on add task start";
export const ADD_TASK_SUCCESS = "on add task success"


export const addTask = createAction(ADD_TASK_INITIATE, props<{task: Task}>());
export const addTaskSuccess = createAction(ADD_TASK_SUCCESS, props<{task: Task}>()); 

export const LOAD_TASKS = 'load all tasks';
export const LOAD_TASKS_SUCCESS= 'load tasks success';


export const loadAllTasks = createAction(LOAD_TASKS)
export const loadTasksSuccess = createAction(
    LOAD_TASKS_SUCCESS,
    props<{ tasks: Task[]}>()
)