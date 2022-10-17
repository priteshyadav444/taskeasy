import { createAction, props } from "@ngrx/store";
import { Project } from "src/app/models/projects.models";

export const CREATE_PROJECT = "project create";
export const CREATE_PROJECT_SUCESS = "Project Created"
export const addProjectSucess = createAction (
    CREATE_PROJECT_SUCESS,
    props<{ projects:Project}>()
);

export const addProjectStart = createAction(
    CREATE_PROJECT,
    props<{ title:string }>()

)