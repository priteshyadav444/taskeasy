import { createAction, props } from "@ngrx/store";
import { User } from "src/app/Models/user.models";

export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login Success';
export const LOGIN_FAIL = '[auth page] login Fail';

export const SIGNUP_START = '[auth page] signup start';
export const SIGNUP_SUCCESS = '[auth page] signup success';

export const AUTO_LOGIN = "auto login";


export const signupStart = createAction (
    SIGNUP_START,
    props<{ firstname:string, lastname:string, email: string; password: string ; }>()
  );
  
  export const signupSuccess = createAction(
    SIGNUP_SUCCESS,
    props<{ user: User; redirect: boolean }>()
  );


  export const loginStart = createAction(
    LOGIN_START,
    props<{ email: string; password: string }>()
  );
  export const loginSuccess = createAction(
   
    LOGIN_SUCCESS,
    props<{ user: User; redirect: boolean }>()
  );


  export const autoLogin = createAction(AUTO_LOGIN);
