import { Routes } from '@angular/router';
import { RolesComponent } from './pages/roles/roles.component';
import { ListRolesComponent } from './pages/list-roles/list-roles.component';

export const routes: Routes = [
  {
    path: '',
    component: RolesComponent ,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch : 'full'
      },
      {
        path: 'list',
        component: ListRolesComponent
      },
    ]
  },

];
