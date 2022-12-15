import { Project } from "src/app/models/projects.models";
import { Task } from "src/app/models/task.models";
export const COUNTER_STATE_NAME = 'tasks';

export interface TaskState{
    tasks: Task[],
    projectDetails : Project
}
export const intialState:TaskState = {
    tasks :[],
    projectDetails : null
}