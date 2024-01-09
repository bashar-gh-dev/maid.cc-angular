import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, delay, catchError } from 'rxjs/operators';
import { UsersService } from '../../services/users.service';
import { getUserFailed, getUserRequest, getUserSuccess } from './user.actions';
import { EMPTY } from 'rxjs';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private usersService: UsersService) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserRequest),
      switchMap((action) =>
        this.usersService.findById(action.userId).pipe(
          map((data) => getUserSuccess(data.data)),
          catchError((error) =>
            EMPTY.pipe(
              map(() =>
                getUserFailed({
                  message:
                    error.message ?? `Unable to get the user ${action.userId}`,
                })
              )
            )
          )
        )
      )
    )
  );
}
