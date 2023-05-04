import { Action, createReducer, on } from '@ngrx/store';
import * as ProfileActions from '../profile/profile.action';

export interface ProfileState {
  userInfo: any;
  errorMessage: any;
}

export const initialState: ProfileState = {
  userInfo: undefined,
  errorMessage: ''
};

export const userInfoReducer = createReducer(
  initialState,
  on(ProfileActions.getUserInfoSuccess, (state, userInfo) => ({
    ...state,
    userInfo: userInfo,
  })),
  on(ProfileActions.updateUserInfoSuccess, (state, userInfo) => ({
    ...state,
    userInfo: userInfo,
  })),
  on(ProfileActions.setHandleError, (state, errorMessage) =>  ({
    ...state,
    errorMessage: errorMessage
  }))
  
);
