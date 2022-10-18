import { createAction, props } from "@ngrx/store";
import { Project } from "src/app/models/projects.models";

export const CREATE_PROJECT = "project create";
export const CREATE_PROJECT_SUCESS = "Project Created"
export const LOAD_PROJECTS = "Loading Projects";
export const LOAD_PROJECTS_SUCCESS = "All Project Loaded"

export const addProjectSucess = createAction (
    CREATE_PROJECT_SUCESS,
    props<{ project:Project}>()
);

export const addProjectStart = createAction(
    CREATE_PROJECT,
    props<{ project:Project}>()

)

export const loadAllProjects = createAction(LOAD_PROJECTS)

export const loadProjectsSuccess = createAction(
    LOAD_PROJECTS_SUCCESS,
    props<{ projects: Project[]}>()
)
