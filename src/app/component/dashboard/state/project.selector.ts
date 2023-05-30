import {
  createFeatureSelector,
  createSelector,
  props,
  select,
} from '@ngrx/store';
import { ProjectState } from './project.state';

export const PROJECTS_STATE_NAME = 'projects';

const getProjectsState =
  createFeatureSelector<ProjectState>(PROJECTS_STATE_NAME);

export const getAllProjects = createSelector(getProjectsState, (state) => {
  return state.projects;
});

export const getAllPendingTasks = createSelector(getProjectsState, (state) => {
  var allTasks = [];
  const result = state.projects;
  if (result) {
    for (let key in result) {
      let project = result[key];
      let theme_colour = '';
      if (
        project.theme_colour == '' ||
        project.theme_colour == undefined ||
        project.theme_colour == null
      ) {
        // deafault theme_colour
        theme_colour = '#8F43EE';
      } else {
        theme_colour = project.theme_colour;
      }
      let updatedtasks = project.tasks?.filter(
        (data) =>
          data.task_status == 'unschedule' || data.task_status == 'pending'
      );
      updatedtasks = updatedtasks?.map((data) => {
        return { ...data, theme_colour };
      });
      Array.prototype.push.apply(allTasks, updatedtasks);
    }
  }
  return allTasks;
});

export const isProjectLoaded = createSelector(getProjectsState, (state) => {
  return state.isProjectLoaded;
});
