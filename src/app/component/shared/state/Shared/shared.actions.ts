import { createAction, props } from '@ngrx/store';
export const SET_LOADING_ACTION = '[shared state] set loading spinner';
export const SET_ERROR_MESSAGE = '[shared state] set error message';
export const SET_LOGO_LOADING_ACTION = '[shared state] set logo loading';

export const setLoadingSpinner = createAction(
  SET_LOADING_ACTION,
  props<{ status: boolean }>()
);

export const setLogoLoading = createAction(
  SET_LOGO_LOADING_ACTION,
  props<{ status: boolean }>()
);

export const setErrorMessage = createAction(
  SET_ERROR_MESSAGE,
  props<{ message: string }>()
);

export const setTaskLoaded = createAction(
  '[Shared] Set Is Task Loaded',
  props<{ status: boolean }>()
);
