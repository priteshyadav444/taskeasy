import { AuthReducer } from "../component/auth/state/auth.reducer";
import { AuthState } from "../component/auth/state/auth.state";
import { tasksReducer } from "../component/task/state/task.reducers";
import { TaskState } from "../component/task/state/task.state";
import { ProjectReducer } from "../main/dashboard/state/project.reducer";
import { ProjectState } from "../main/dashboard/state/project.state";
import { SharedReducer } from "../shared/state/Shared/shared.reducer";
import { SHARED_STATE_NAME } from "../shared/state/Shared/shared.selector";
import { SharedState } from "../shared/state/Shared/shared.state";

export interface AppState{
    tasks: TaskState;
    auth: AuthState;
    projects: ProjectState,
    [SHARED_STATE_NAME]: SharedState;
}
export const appReducer = {
    tasks: tasksReducer,
    auth: AuthReducer,
    projects : ProjectReducer,
    [SHARED_STATE_NAME]:SharedReducer
}