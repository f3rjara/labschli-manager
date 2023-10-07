import { Routes } from '@angular/router';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { AdminUserComponent } from './pages/admin-user/admin-user.component';

export const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent ,
    children: [
      {
        path: '',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: ListUsersComponent
      },
      {
        path: 'agregar',
        component: AdminUserComponent
      },
      {
        path: 'editar/:id',
        component: AdminUserComponent,
        pathMatch: 'full',
      },
      {
        path: 'editar',
        redirectTo: 'list',
      },
    ]
  },
];
