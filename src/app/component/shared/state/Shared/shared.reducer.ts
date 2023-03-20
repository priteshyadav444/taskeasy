import { setLoadingSpinner, setErrorMessage, setLogoLoading, setTaskLoaded } from './shared.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState } from './shared.state';

const _sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => {
    return {
      ...state,
      showLoading: action.status,
    };
  }),
  on(setErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.message,
    };
  }),
  on(setLogoLoading, (state, action) => {
    return {
      ...state,
      showLogoLoading: action.status,
    };
  }),
  on(setTaskLoaded, (state, action) => {
    return {
      ...state,
      isTaskLoaded: action.status,
    };
  })
);

export function SharedReducer(state:any, action:any) {
  return _sharedReducer(state, action);
}
