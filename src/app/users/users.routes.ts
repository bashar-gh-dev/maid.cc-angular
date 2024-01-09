import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import * as userReducer from './store/user-profile/user.reducer';
import * as usersListReducer from './store/users-list/users-list.reducer';
import { UserEffects } from './store/user-profile/user.effects';
import { UsersListEffect } from './store/users-list/users-list.effects';
import { provideEffects } from '@ngrx/effects';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/header/header.component').then(
        (c) => c.HeaderComponent
      ),
    children: [
      {
        path: ':userId',
        loadComponent: () =>
          import('./components/user-profile/user-profile.component').then(
            (c) => c.UserProfileComponent
          ),
        providers: [
          provideState({
            name: userReducer.userProfileFeatureKey,
            reducer: userReducer.reducer,
          }),
          provideEffects(UserEffects),
        ],
      },
      {
        path: '',
        loadComponent: () =>
          import('./components/users-list/users-list.component').then(
            (c) => c.UsersListComponent
          ),
        providers: [
          provideState({
            name: usersListReducer.usersListFeatureKey,
            reducer: usersListReducer.reducer,
          }),
          provideEffects(UsersListEffect),
        ],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
