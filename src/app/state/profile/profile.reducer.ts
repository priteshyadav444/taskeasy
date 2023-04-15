import { Action, createReducer, on } from '@ngrx/store';
import * as ProfileActions from '../profile/profile.action';

export interface State {
  userInfo: any;
}

export const initialState: State = {
  userInfo: undefined,
};

export const scoreboardReducer = createReducer(
  initialState,
  on(ProfileActions.getUserInfoSuccess, (state, userInfo) => ({
    ...state,
    userInfo: userInfo,
  })),
  on(ProfileActions.updateUserInfoSuccess, (state, userInfo) => ({
    ...state,
    userInfo: userInfo,
  }))
  
);
