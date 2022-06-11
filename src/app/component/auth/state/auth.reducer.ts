
import { createReducer, on } from '@ngrx/store';
import { signupSuccess } from './auth.actions';
import { initialState } from './auth.state';

const _authReducer = createReducer(
  initialState,
 
  on(signupSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
);

export function AuthReducer(state:any, action:any) {
  return _authReducer(state, action);
}
