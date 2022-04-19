import { AuthReducer } from "../component/auth/state/auth.reducer";
import { AuthState } from "../component/auth/state/auth.state";
import { tasksReducer } from "../component/task/state/task.reducers";
import { TaskState } from "../component/task/state/task.state";
import { SharedReducer } from "./Shared/shared.reducer";
import { SHARED_STATE_NAME } from "./Shared/shared.selector";
import { SharedState } from "./Shared/shared.state";

export interface AppState{
    tasks: TaskState;
    auth: AuthState;
    [SHARED_STATE_NAME]: SharedState;
}
export const appReducer = {
    tasks: tasksReducer,
    auth: AuthReducer,
    [SHARED_STATE_NAME]:SharedReducer
}