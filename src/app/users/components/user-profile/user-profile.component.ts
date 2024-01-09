import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, EMPTY, switchMap } from 'rxjs';
import { error, loading, user } from '../../store/user-profile/user.selectors';
import { UserState } from '../../store/user-profile/user.reducer';
import { getUserRequest } from '../../store/user-profile/user.actions';
import { SubSink } from 'subsink';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    MatCardModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  providers: [],
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit, OnDestroy {
  loading$ = new BehaviorSubject<UserState['loading']>(false);
  error$ = new BehaviorSubject<UserState['error']>(undefined);
  user$ = new BehaviorSubject<UserState['user']>(undefined);
  subSink = new SubSink();

  constructor(private store: Store<UserState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subSink.sink = this.store.select(user).subscribe(this.user$);
    this.subSink.sink = this.store.select(loading).subscribe(this.loading$);
    this.subSink.sink = this.store.select(error).subscribe(this.error$);
    this.subSink.sink = this.route.params
      .pipe(
        switchMap((params) => {
          const userId = parseInt(params['userId']) as number | undefined;
          if (typeof userId === 'number')
            this.store.dispatch(getUserRequest({ userId }));
          return EMPTY;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
