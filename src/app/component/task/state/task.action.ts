import { createAction, props } from "@ngrx/store";
import { Project } from "src/app/models/projects.models";
import { Task } from "src/app/models/task.models";

export const ADD_TASK_INITIATE = "on add task start";
export const ADD_TASK_SUCCESS = "on add task success"

export const UPDATE_TASK_INITIATE = "on UPDATE task start";
export const UPDATE_TASK_SUCCESS = "on UPDATE task success"

export const LOAD_DATA = 'load all data start';
export const LOAD_DATA_SUCCESS= 'all data load';
export const RESET_TASKS= 'reset tasks success';

export const addTask = createAction(ADD_TASK_INITIATE, props<{task: Task, pid:string}>());
export const addTaskSuccess = createAction(ADD_TASK_SUCCESS, props<{task: Task}>()); 

export const updateTask = createAction(UPDATE_TASK_INITIATE, props<{task: Task, pid:string}>());
export const updateTaskSuccess = createAction(UPDATE_TASK_SUCCESS, props<{task: Task}>());

export const loadAllData = createAction(LOAD_DATA,props<{ pid:string }>())

export const loadDataSuccess = createAction(
    LOAD_DATA_SUCCESS,
    props<{ tasks: Task[], projectDetails: Project}>()
)

export const resetTasks = createAction(RESET_TASKS)

