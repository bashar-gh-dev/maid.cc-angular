import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UsersListState } from '../../store/users-list/users-list.reducer';
import { SubSink } from 'subsink';
import * as usersListSelectors from '../../store/users-list/user-list.selectors';
import { getUsersListRequest } from '../../store/users-list/users-list.actions';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './users-list.component.html',
  styles: ``,
})
export class UsersListComponent implements OnInit, OnDestroy {
  loading$ = new BehaviorSubject<UsersListState['loading']>(false);
  error$ = new BehaviorSubject<UsersListState['error']>(undefined);
  users$ = new BehaviorSubject<UsersListState['users']>([]);
  pagination$ = new BehaviorSubject<
    Pick<
      UsersListState,
      'page' | 'totalPages' | 'totalUsers' | 'totalUsersPerPage'
    >
  >({ page: 1, totalPages: 0, totalUsers: 0, totalUsersPerPage: 0 });
  subs = new SubSink();

  constructor(private store: Store<UsersListState>) {}

  ngOnInit(): void {
    this.subs.sink = this.store
      .select(usersListSelectors.users)
      .subscribe(this.users$);
    this.subs.sink = this.store
      .select(usersListSelectors.loading)
      .subscribe(this.loading$);
    this.subs.sink = this.store
      .select(usersListSelectors.error)
      .subscribe(this.error$);
    this.subs.sink = this.store
      .select(usersListSelectors.pagination)
      .subscribe(this.pagination$);
    this.store.dispatch(getUsersListRequest({ page: 1 }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  handlePageEvent(e: PageEvent) {
    this.store.dispatch(getUsersListRequest({ page: e.pageIndex + 1 }));
  }
}
