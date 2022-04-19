import { createReducer, on } from '@ngrx/store';
import { addTask, addTaskSuccess } from './task.action';
import { intialState } from './task.state';

const _tasksReducer = createReducer(
  intialState,
  on(addTaskSuccess, (state, action) => {
    let task = { ...action.task };
    return {
      ...state,
      tasks: [...state.tasks, task],
    };
  })
);

export function tasksReducer(state: any, action: any) {
  return _tasksReducer(state, action);
}
