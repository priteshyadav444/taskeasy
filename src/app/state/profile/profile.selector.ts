import { createSelector } from '@ngrx/store';
import { ProfileState } from './profile.reducer';
  
export const selectFeature = (state: ProfileState) => state.userInfo;
 
export const selectProfileState = createSelector(
  selectFeature,
  (state: ProfileState) => {
      return state?.userInfo?.userInfo
  }
);