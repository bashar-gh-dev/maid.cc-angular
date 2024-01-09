import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UsersService } from '../../services/users.service';
import {
  getUsersListFailed,
  getUsersListRequest,
  getUsersListSuccess,
} from './users-list.actions';
import { EMPTY } from 'rxjs';

@Injectable()
export class UsersListEffect {
  constructor(private actions$: Actions, private usersService: UsersService) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsersListRequest),
      switchMap((action) =>
        this.usersService.find(action.page).pipe(
          map((data) =>
            getUsersListSuccess({
              users: data.data,
              totalUsers: data.total,
              page: data.page,
              totalPages: data.total_pages,
              totalUsersPerPage: data.per_page,
            })
          ),
          catchError((error) =>
            EMPTY.pipe(
              map(() =>
                getUsersListFailed({
                  message: error.message ?? 'Unable to get users',
                })
              )
            )
          )
        )
      )
    )
  );
}
