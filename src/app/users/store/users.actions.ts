import { createActionGroup, props } from '@ngrx/store';
import { UserModel } from '../models/user.model';

export const UsersActions = createActionGroup({
  source: 'Users/API',
  events: {
    'Get User': props<{ userId: number }>(),
    'Get User Success': props<UserModel>(),
    'Get User Failed': props<{ message: string }>(),
    'Get Users List': props<{ page?: number }>(),
    'Get Users List Success': props<{
      users: UserModel[];
      totalUsers: number;
      page: number;
      totalPages: number;
      totalUsersPerPage: number;
    }>(),
    'Get Users List Failed': props<{ message: string }>(),
  },
});
