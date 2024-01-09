import { createReducer, on } from '@ngrx/store';
import { UserModel } from '../../models/user.model';
import { getUserFailed, getUserRequest, getUserSuccess } from './user.actions';

export const userProfileFeatureKey = 'userProfile';

export interface UserState {
  loading: boolean;
  error?: string;
  user?: UserModel;
}

export const initialState: UserState = {
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(getUserRequest, (_state, action) => ({
    loading: true,
    user: undefined,
    error: undefined,
  })),
  on(getUserSuccess, (_state, action) => ({
    loading: false,
    user: action,
    error: undefined,
  })),
  on(getUserFailed, (_state, action) => ({
    loading: false,
    user: undefined,
    error: action.message,
  }))
);

export const selectLoading = (state: UserState) => state.loading;
export const selectError = (state: UserState) => state.error;
export const selectUser = (state: UserState) => state.user;
