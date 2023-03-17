import { createAction, props } from '@ngrx/store';
import { Project } from 'src/app/models/projects.models';

export const CREATE_PROJECT = 'project create';
export const CREATE_PROJECT_SUCESS = 'Project Created';

export const DELETE_PROJECT = 'project Deleted';
export const DELETE_PROJECT_SUCCESS = 'project Deleted Success';

export const LOAD_PROJECTS = 'Loading Projects';
export const LOAD_PROJECTS_SUCCESS = 'All Project Loaded';

export const UPDATE_PROJECT = 'Upadte project';
export const UPDATE_PROJECT_SUCCESS = 'Upadte project success';

export const addProjectSucess = createAction(
  CREATE_PROJECT_SUCESS,
  props<{ project: Project }>()
);
export const addProjectStart = createAction(
  CREATE_PROJECT,
  props<{ project: Project }>()
);

export const loadAllProjects = createAction(LOAD_PROJECTS);
export const loadProjectsSuccess = createAction(
  LOAD_PROJECTS_SUCCESS,
  props<{ projects: Project[] }>()
);

export const deleteProjectStart = createAction(
  DELETE_PROJECT,
  props<{ pid: string }>()
);
export const deleteProjectSuccess = createAction(
  DELETE_PROJECT_SUCCESS,
  props<{ pid: string }>()
);

export const updateProjectStart = createAction(
  UPDATE_PROJECT,
  props<{ project: Project }>()
);
export const updateProjectSucess = createAction(
  UPDATE_PROJECT_SUCCESS,
  props<{ project: Project }>()
);

export const resetProjectState = createAction('[Project] Reset State');
