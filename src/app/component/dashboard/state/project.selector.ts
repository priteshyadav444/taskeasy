import { createFeatureSelector, createSelector, props, select } from "@ngrx/store";
import { ProjectState } from "./project.state";

export const PROJECTS_STATE_NAME = "projects"

const getProjectsState = createFeatureSelector<ProjectState>(PROJECTS_STATE_NAME);

export const getAllProjects = createSelector(getProjectsState, (state)=>{
    return state.projects;
})

export const getProjectTitle = (projectid: string) => createSelector(getProjectsState, (state)=>{
    console.log(projectid)
    // state.projects.forEach((project)=>{
    //     if(project._id==projectid){
    //         console.log(project)
    //         return project.project_title;
    //     }
    // })
})