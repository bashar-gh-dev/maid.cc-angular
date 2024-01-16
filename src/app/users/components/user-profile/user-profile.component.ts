import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { State } from '../../store/users.feature';
import {
  selectError,
  selectLoading,
  selectUserById,
} from '../../store/users.selectors';
import { EMPTY, switchMap, tap } from 'rxjs';
import { UsersActions } from '../../store/users.actions';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  providers: [],
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit, OnDestroy {
  subs = new SubSink();

  loading$ = this.store.select(selectLoading);

  error$ = this.store.select(selectError);

  user$ = this.route.params.pipe(
    switchMap((params) => {
      const userId = parseInt(params['userId']);
      return isFinite(userId)
        ? this.store.select(selectUserById(userId))
        : EMPTY;
    })
  );

  constructor(private store: Store<State>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subs.sink = this.route.params
      .pipe(
        tap((params) => {
          const userId = parseInt(params['userId']);
          if (isFinite(userId))
            this.store.dispatch(UsersActions.getUser({ userId }));
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
