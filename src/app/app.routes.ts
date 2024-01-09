import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./users/users.routes').then((m) => m.routes),
  },
  { path: '**', redirectTo: 'users' },
];
