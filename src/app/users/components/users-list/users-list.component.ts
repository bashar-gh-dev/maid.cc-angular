import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { State } from '../../store/users.feature';
import {
  selectError,
  selectLoading,
  selectPagination,
  selectUsers,
} from '../../store/users.selectors';
import { UsersActions } from '../../store/users.actions';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './users-list.component.html',
  styles: ``,
})
export class UsersListComponent implements OnInit {
  loading$ = this.store.select(selectLoading);

  error$ = this.store.select(selectError);

  users$ = this.store.select(selectUsers);

  pagination$ = this.store.select(selectPagination);

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(UsersActions.getUsersList({ page: 1 }));
  }

  handlePageEvent(e: PageEvent) {
    this.store.dispatch(UsersActions.getUsersList({ page: e.pageIndex + 1 }));
  }
}
