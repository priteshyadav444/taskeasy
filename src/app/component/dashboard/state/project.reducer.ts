import { createReducer, on } from '@ngrx/store';
import { addProjectSucess, deleteProjectSuccess, loadProjectsSuccess } from './project.action';
import { initialState } from './project.state';

const _projectReducer = createReducer(
  initialState,
  on(addProjectSucess, (state, action) => {
    let project = { ...action.project };
    return {
      ...state,
      projects: [...state.projects, project],
    };
  }),
  on(loadProjectsSuccess, (state, action) => {
    return {
      ...state,
      projects: action.projects,
    };
  }),
  on(deleteProjectSuccess,(state,action) => {
    const filtertedData = state.projects.filter((project)=>{
      return project._id!=action.pid;
    });
    console.log(filtertedData);
    return {
      ...state,
      projects: state.projects.filter((project)=>{
        return project._id!=action.pid;
      })
    }
  })
);

export function ProjectReducer(state: any, action: any) {
  return _projectReducer(state, action);
}
