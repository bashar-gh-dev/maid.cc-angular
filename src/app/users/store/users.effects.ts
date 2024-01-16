import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { UsersService } from '../services/users.service';
import { State, UsersFeature } from './users.feature';
import { UsersActions } from './users.actions';

@Injectable()
export default class UsersEffects {
  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private store: Store<State>
  ) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.getUser),
      concatLatestFrom((action) =>
        this.store
          .select(UsersFeature.selectEntities)
          .pipe(map((entities) => entities[action.userId]))
      ),
      switchMap(([action, user]) =>
        (user
          ? of(user)
          : this.usersService
              .findById(action.userId)
              .pipe(map((response) => response.data))
        ).pipe(
          map((user) => UsersActions.getUserSuccess(user)),
          catchError((error) =>
            of(
              UsersActions.getUserFailed({
                message:
                  error.message ?? `Unable to get the user ${action.userId}`,
              })
            )
          )
        )
      )
    )
  );

  getUsersList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.getUsersList),
      switchMap((action) =>
        this.usersService.find(action.page).pipe(
          map((data) =>
            UsersActions.getUsersListSuccess({
              users: data.data,
              totalUsers: data.total,
              page: data.page,
              totalPages: data.total_pages,
              totalUsersPerPage: data.per_page,
            })
          ),
          catchError((error) =>
            of(
              UsersActions.getUserFailed({
                message: error.message ?? 'Unable to get users list',
              })
            )
          )
        )
      )
    )
  );
}
