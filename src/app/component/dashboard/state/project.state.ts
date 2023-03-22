import { Project } from 'src/app/models/projects.models';

export interface ProjectState {
  projects: Project[];
  isProjectLoaded: boolean;
}

export const initialState: ProjectState = {
  projects: null,
  isProjectLoaded: false,
};
