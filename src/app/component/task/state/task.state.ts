import { Task } from "src/app/Models/task.models";
export const COUNTER_STATE_NAME = 'tasks';

export interface TaskState{
    tasks: Task[],
}
export const intialState:TaskState = {
    tasks :[]
}