import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { UsersFeature } from './store/users.feature';
import UsersEffects from './store/users.effects';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/header/header.component').then(
        (c) => c.HeaderComponent
      ),
    providers: [
      provideState({
        name: UsersFeature.name,
        reducer: UsersFeature.reducer,
      }),
      provideEffects(UsersEffects),
    ],
    children: [
      {
        path: ':userId',
        loadComponent: () =>
          import('./components/user-profile/user-profile.component').then(
            (c) => c.UserProfileComponent
          ),
      },
      {
        path: '',
        loadComponent: () =>
          import('./components/users-list/users-list.component').then(
            (c) => c.UsersListComponent
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
