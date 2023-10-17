import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Column, TableDataComponent } from '@molecules/table-data/table-data.component';
import { LoadderComponent } from '@molecules/loadder/loadder.component';
import { UserService } from '@app/core/services/users/users.service';
import { IUserRegister } from '@app/core/models/auth/user-register.model';

@Component({
  selector: 'app-list-roles',
  standalone: true,
  imports: [CommonModule, TableDataComponent, LoadderComponent],
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.scss']
})
export class ListRolesComponent implements OnInit, AfterViewInit {
  /**
  * Permite mostrar el loadder mientras se obtienen los datos de los usuarios
  * @memberof ListRolesComponent
  */
  isLoadderShow: boolean = true;

  columnsAdminUsers: Column[] = [
    {
      columnDef: 'id',
      header: '#'
    },
    {
      columnDef: 'numid',
      header: 'Número de identificación'
    },
    {
      columnDef: 'email',
      header: 'Correo',
    },
    {
      columnDef: 'rol',
      header: 'Rol'
    },
    {
      columnDef: 'name',
      header: 'Nombres'
    },
    {
      columnDef: 'show',
      header: 'Ver',
      isLink: true,
      icon: 'visibility'
    },
  ];

  dataAdminUser: any[] = [];
  private _userAdminService = inject(UserService);

  ngOnInit(): void {
    this._userAdminService.getUserAdmins().subscribe({
      next: (response) => {
        if( response.error ) { console.log(response.error); return };
        this.dataAdminUser = this.buildUserAdmninData(response.user);
      },
      error: (err) => {
        console.error(err);
        this.isLoadderShow = false;
      },
      complete: () => {
        this.isLoadderShow = false;
      }
    });
  }

  ngAfterViewInit(): void {}

  buildUserAdmninData( users: IUserRegister[] ): any[] {
    return users.map((user) => {
      const { id, numid, email, rol, name, lastname } = user;
      return {
        id,
        numid,
        email,
        rol,
        'name': `${name} ${lastname}`,
        'show': `/admin/usuarios/editar/${id}`
      }
    });
  }
}
