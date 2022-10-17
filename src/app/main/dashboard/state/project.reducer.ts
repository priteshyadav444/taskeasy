import { createReducer, on } from '@ngrx/store';
import { addProjectSucess } from './project.action';
import { initialState } from './project.state';

const _projectReducer = createReducer(
  initialState,

  on(addProjectSucess, (state, action) => {
    return {
      ...state,
      projects:  action.projects ,
    };
  })
);

export function ProjectReducer(state: any, action: any) {
  return _projectReducer(state, action);
}
