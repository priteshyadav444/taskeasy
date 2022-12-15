import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import {
  addTask,
  addTaskSuccess,
  loadDataSuccess,
  resetTasks,
} from './task.action';
import { intialState } from './task.state';

const _tasksReducer = createReducer(
  intialState,
  on(addTaskSuccess, (state, action) => {
    let task = { ...action.task };
    return {
      ...state,
      tasks: [...state.tasks, task],
    };
  }),
  on(loadDataSuccess, (state, action) => {
    return {
      ...state,
      tasks: action.tasks,
      projectDetails : action.projectDetails,
    };
  }),
  on(resetTasks, (state, action) => {
    return { ...state, tasks: [] };
  })
);

export function tasksReducer(state: any, action: any) {
  return _tasksReducer(state, action);
}
