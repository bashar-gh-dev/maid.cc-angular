import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../models/user.model';

export const getUserRequest = createAction(
  '[Users/API] Get User Request',
  props<{ userId: number }>()
);

export const getUserSuccess = createAction(
  '[Users/API] Get User Success',
  props<UserModel>()
);

export const getUserFailed = createAction(
  '[Users/API] Get User Failed',
  props<{ message: string }>()
);
