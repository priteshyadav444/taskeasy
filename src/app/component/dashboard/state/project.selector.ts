import { createFeatureSelector, createSelector, props, select } from "@ngrx/store";
import { ProjectState } from "./project.state";

export const PROJECTS_STATE_NAME = "projects"

const getProjectsState = createFeatureSelector<ProjectState>(PROJECTS_STATE_NAME);

export const getAllProjects = createSelector(getProjectsState, (state)=>{
    return state.projects;
})

