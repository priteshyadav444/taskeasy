import { createReducer, on } from '@ngrx/store';
import {
  addProjectSucess,
  deleteProjectSuccess,
  loadProjectsSuccess,
  resetProjectState,
  updateProjectStart,
  updateProjectSucess,
} from './project.action';
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
      isProjectLoaded:true
    };
  }),
  on(deleteProjectSuccess, (state, action) => {
    const filtertedData = state.projects.filter((project) => {
      return project._id != action.pid;
    });
    return {
      ...state,
      projects: state.projects.filter((project) => {
        return project._id != action.pid;
      }),
    };
  }),
  on(updateProjectSucess, (state, action) => {
    const updatedProject = action.project;
    const projects = state.projects.map((data) => {
      if (data._id == action.project._id)
        return { ...updatedProject, tasks: data.tasks };
      else return data;
    });
    return {
      ...state,
      projects: [...projects],
    };
  }),
  on(resetProjectState, (state,action) => {
    return {
      ...initialState,
      isProjectLoaded: action.resetProjectLoadedState
    };
  })
);

export function ProjectReducer(state: any, action: any) {
  return _projectReducer(state, action);
}
