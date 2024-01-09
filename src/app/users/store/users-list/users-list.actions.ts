import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../models/user.model';

export const getUsersListRequest = createAction(
  '[Users/API] Get Users Request',
  props<{ page?: number }>()
);

export const getUsersListSuccess = createAction(
  '[Users/API] Get Users Success',
  props<{
    users: UserModel[];
    totalUsers: number;
    page: number;
    totalPages: number;
    totalUsersPerPage: number;
  }>()
);

export const getUsersListFailed = createAction(
  '[Users/API] Get Users Failed',
  props<{ message: string }>()
);
