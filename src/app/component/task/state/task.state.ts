import { Task } from "src/app/models/task.models";
export const COUNTER_STATE_NAME = 'tasks';

export interface TaskState{
    tasks: Task[],
}
export const intialState:TaskState = {
    tasks :[]
}