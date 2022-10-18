import { Project } from "src/app/models/projects.models";

export interface ProjectState {
    projects: Project[] ;
}
  
export const initialState: ProjectState = {
    projects: null,
};
  