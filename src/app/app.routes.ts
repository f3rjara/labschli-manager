import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    loadChildren: () => import('./ui/admin/admin.routes').then(admin => admin.routes),
  },
  {
    path: 'auth',
    loadChildren: () => import('./ui/auth/auth.routes').then(auth => auth.routes),
  },
  {
    path: 'consulta',
    loadChildren: () => import('./ui/home/home.routes').then((home) => home.routes),
  },
];
