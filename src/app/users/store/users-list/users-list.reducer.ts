import { createReducer, on } from '@ngrx/store';
import { UserModel } from '../../models/user.model';
import {
  getUsersListFailed,
  getUsersListRequest,
  getUsersListSuccess,
} from './users-list.actions';

export const usersListFeatureKey = 'usersList';

export interface UsersListState {
  loading: boolean;
  error?: string;
  users: UserModel[];
  totalUsers: number;
  page: number;
  totalPages: number;
  totalUsersPerPage: number;
}

export const initialState: UsersListState = {
  loading: false,
  users: [],
  totalUsers: 0,
  page: 0,
  totalPages: 0,
  totalUsersPerPage: 0,
};

export const reducer = createReducer(
  initialState,
  on(getUsersListRequest, (state, _action) => ({
    ...state,
    loading: true,
  })),
  on(getUsersListSuccess, (_state, action) => ({
    loading: false,
    users: action.users,
    totalUsers: action.totalUsers,
    page: action.page,
    totalPages: action.totalPages,
    totalUsersPerPage: action.totalUsersPerPage,
  })),
  on(getUsersListFailed, (_state, action) => ({
    ...initialState,
    error: action.message,
  }))
);

export const selectLoading = (state: UsersListState) => state.loading;
export const selectError = (state: UsersListState) => state.error;
export const selectUsers = (state: UsersListState) => state.users;
export const selectPagination = ({
  totalPages,
  page,
  totalUsers,
  totalUsersPerPage,
}: UsersListState) => ({
  totalPages,
  page,
  totalUsers,
  totalUsersPerPage,
});
