import { formatDate } from '@angular/common';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.state';

export const TASKS_STATE_NAME = 'tasks';

const getTasksState = createFeatureSelector<TaskState>(TASKS_STATE_NAME);

const date1 = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');

export const getTasks = createSelector(getTasksState, (state) => {
  return state.tasks;
});

export const getProjectDetails = createSelector(getTasksState, (state) => {
  return state.projectDetails;
});

export const getPendingTasks = createSelector(getTasksState, (data) => {
  const tasks = data.tasks;
  const theme_colour = data.projectDetails.theme_colour;

  // tasks.forEach((data)=> console.log(date1 > formatDate(data.scheduled_date!,'yyyy-MM-dd','en_US')));
  let result = tasks.filter((data) => data.task_status == 'pending');
  result = result.map((data) => {
    return { ...data, theme_colour: theme_colour };
  });
  return result;
});

export const getTodayTasks = createSelector(getTasks, (tasks) => {
  // tasks.forEach((data)=> console.log(date1 > formatDate(data.scheduled_date!,'yyyy-MM-dd','en_US')));
  return tasks.filter(
    (data) => formatDate(data.scheduled_date!, 'yyyy-MM-dd', 'en_US') == date1
  );
});

export const getTodayCompletedTasks = createSelector(getTasks, (tasks) => {
  // tasks.forEach((data)=> console.log(date1 > formatDate(data.scheduled_date!,'yyyy-MM-dd','en_US')));
  return tasks.filter(
    (data) =>
      formatDate(data.scheduled_date!, 'yyyy-MM-dd', 'en_US') == date1 &&
      data.task_status == 'completed'
  );
});

// for getting selected Project details
export const getSelectdProjectDetails = createSelector(
  getProjectDetails,
  (selectedProject) => {
    return selectedProject;
  }
);
