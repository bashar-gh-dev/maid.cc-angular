import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  usersListFeatureKey,
  selectError,
  selectLoading,
  UsersListState,
  selectUsers,
  selectPagination,
} from './users-list.reducer';

const userSelector = createFeatureSelector<UsersListState>(usersListFeatureKey);

export const loading = createSelector(userSelector, selectLoading);
export const error = createSelector(userSelector, selectError);
export const users = createSelector(userSelector, selectUsers);
export const pagination = createSelector(userSelector, selectPagination);
