import { createAction, props } from '@ngrx/store';
import { Project } from 'src/app/models/projects.models';
import { Task } from 'src/app/models/task.models';

export const ADD_TASK_INITIATE = '[Task] on add task start';
export const ADD_TASK_SUCCESS = '[Task] on add task success';

export const UPDATE_TASK_INITIATE = '[Task] on UPDATE task start';
export const UPDATE_TASK_SUCCESS = '[Task] on UPDATE task success';

export const DELETE_TASK_INITIATE = '[Task] on delete task start';
export const DELETE_TASK_SUCCESS = '[Task] on delete task success';

export const LOAD_DATA = '[Task] load all data start';
export const LOAD_DATA_SUCCESS = '[Task] all data loaded';
export const RESET_TASKS = '[Task] reset tasks success';

export const TASK_PRELOADED = '[Task] task preloaded';

export const addTask = createAction(
  ADD_TASK_INITIATE,
  props<{ task: Task; pid: string }>()
);
export const addTaskSuccess = createAction(
  ADD_TASK_SUCCESS,
  props<{ task: Task }>()
);

export const updateTask = createAction(
  UPDATE_TASK_INITIATE,
  props<{ task: Task; pid: string }>()
);
export const updateTaskSuccess = createAction(
  UPDATE_TASK_SUCCESS,
  props<{ task: Task }>()
);

export const deleteTask = createAction(
  DELETE_TASK_INITIATE,
  props<{ task: Task; pid: string }>()
);
export const deleteTaskSuccess = createAction(
  DELETE_TASK_SUCCESS,
  props<{ task: Task }>()
);

export const loadAllData = createAction(LOAD_DATA, props<{ pid: string }>());

export const loadDataSuccess = createAction(
  LOAD_DATA_SUCCESS,
  props<{ tasks: Task[]; projectDetails: Project }>()
);

export const resetTasks = createAction(
  RESET_TASKS,
  props<{ projectId: string }>()
);

export const taskPreloaded = createAction(TASK_PRELOADED);