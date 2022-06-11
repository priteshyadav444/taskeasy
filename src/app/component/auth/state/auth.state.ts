import { User } from "src/app/Models/user.models";

export interface AuthState {
    user: User | null;
  }
  
  export const initialState: AuthState = {
    user: null,
  };
  