import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import {
  addTask,
  addTaskSuccess,
  loadAllTasks,
  loadTasksSuccess,
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
  on(loadTasksSuccess, (state, action) => {
    return {
      ...state,
      tasks: action.tasks,
    };
  }),
  on(resetTasks, (state, action) => {
    return { ...state, tasks: [] };
  })
);

export function tasksReducer(state: any, action: any) {
  return _tasksReducer(state, action);
}
