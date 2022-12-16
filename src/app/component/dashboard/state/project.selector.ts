import { createFeatureSelector, createSelector, props, select } from "@ngrx/store";
import { ProjectState } from "./project.state";

export const PROJECTS_STATE_NAME = "projects"

const getProjectsState = createFeatureSelector<ProjectState>(PROJECTS_STATE_NAME);

export const getAllProjects = createSelector(getProjectsState, (state)=>{
    return state.projects;
})

export const getAllPendingTasks = createSelector(getProjectsState, (state)=>{
    var allTasks = [];
    const result = state.projects
    if (result) {
      for (let key in result) {
        let project = result[key];
        const theme_colour = project.theme_colour;
        let updatedtasks = project.tasks.filter(
          (data) =>
            data.task_status == "unscheduled" || data.task_status == "pending"
        );
        updatedtasks.map((data) => {
          return { ...data, theme_colour };
        });
        Array.prototype.push.apply(allTasks, updatedtasks);
      }
    }
    return allTasks;
})