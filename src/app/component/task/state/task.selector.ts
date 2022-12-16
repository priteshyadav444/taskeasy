import { formatDate } from "@angular/common";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TaskState } from "./task.state";

export const TASKS_STATE_NAME = "tasks";

const getTasksState = createFeatureSelector<TaskState>(TASKS_STATE_NAME);


const date1 = formatDate(new Date(),'yyyy-MM-dd','en_US');


export const getTasks = createSelector(getTasksState, (state)=>{
    return state.tasks;
})

export const getPendingTasks = createSelector(
    getTasks,
    (tasks) => {
        // tasks.forEach((data)=> console.log(date1 > formatDate(data.scheduled_date!,'yyyy-MM-dd','en_US')));
        const result = tasks.filter((data) => (data.task_status=="pending"));
        console.log(result)
        return result;
    }
)

export const getTodayTasks = createSelector(
    getTasks,
    (tasks) => {
        // tasks.forEach((data)=> console.log(date1 > formatDate(data.scheduled_date!,'yyyy-MM-dd','en_US')));
        return tasks.filter((data) => (formatDate(data.scheduled_date!,'yyyy-MM-dd','en_US') == date1))
    }
)

export const getTodayCompletedTasks = createSelector(
    getTasks,
    (tasks) => {
        // tasks.forEach((data)=> console.log(date1 > formatDate(data.scheduled_date!,'yyyy-MM-dd','en_US')));
        return tasks.filter((data) => (formatDate(data.scheduled_date!,'yyyy-MM-dd','en_US') == date1 && data.task_status=="completed"))
    }
)



