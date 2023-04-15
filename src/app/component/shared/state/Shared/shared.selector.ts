import { SharedState } from './shared.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export const SHARED_STATE_NAME = 'shared';

const getSharedState = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const getLoading = createSelector(getSharedState, (state) => {
  return state.showLoading;
});

export const getLogoLoading = createSelector(getSharedState, (state) => {
  return state.showLogoLoading;
});

export const getErrorMessage = createSelector(getSharedState, (state) => {
  return state.errorMessage;
});

