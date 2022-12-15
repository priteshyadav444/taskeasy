import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import {
  addTask,
  addTaskSuccess,
  loadDataSuccess,
  resetTasks,
  updateTaskSuccess,
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
      projectDetails: action.projectDetails,
    };
  }),
  on(updateTaskSuccess, (state, action) => {
    console.log(action.task)
    const updatedTask = action.task;
    const tasks = state.tasks.map((data) =>
      data._id == action.task._id ? { ...updatedTask } : data
    );
    console.log(state.tasks);
    return {
      ...state,
      tasks,
    };
  }),
  on(resetTasks, (state, action) => {
    return { ...state, tasks: [] };
  })
);

export function tasksReducer(state: any, action: any) {
  return _tasksReducer(state, action);
}
