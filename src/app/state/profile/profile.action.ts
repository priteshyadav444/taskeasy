import { createAction, props } from '@ngrx/store';
import { GET_USER } from './profile.enum';
import { UserInfo, UserPassword } from './profile.model'

export const getUserInfo = createAction(
  GET_USER.GET_USER_PROFILE
);


export const getUserInfoSuccess = createAction(
    GET_USER.GET_USER_PROFILE_SUCCESS,
    props<{userInfo:UserInfo}>()
);

export const updateUserInfo = createAction(
    GET_USER.UPDATE_USER_PROFILE_SUCCESS,
    props<{userInfo:UserInfo}>()
);

export const updateUserInfoSuccess = createAction(
    GET_USER.GET_USER_PROFILE_SUCCESS,
    props<{userInfo:UserInfo}>()
);

export const updateUserPassowrdInfo = createAction(
    GET_USER.UPDATE_USER_PASSWORD,
    props<{userPassword:UserPassword}>()
);

export const updateUserPasswordSuccess = createAction(
    GET_USER.UPDATE_USER_PASSWORD_SUCCESS,
    props<{userPassword:UserPassword}>()
);

export const handleError = createAction(
    GET_USER.GET_ERROR,
    props<{error:any}>()
);

export const setHandleError = createAction(
    GET_USER.SET_ERROR,
    props<{errorMessage:any}>()
);