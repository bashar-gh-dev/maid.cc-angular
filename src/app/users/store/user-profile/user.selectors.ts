import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  UserState,
  userProfileFeatureKey,
  selectUser,
  selectError,
  selectLoading,
} from './user.reducer';

const userSelector = createFeatureSelector<UserState>(userProfileFeatureKey);

export const loading = createSelector(userSelector, selectLoading);
export const error = createSelector(userSelector, selectError);
export const user = createSelector(userSelector, selectUser);
