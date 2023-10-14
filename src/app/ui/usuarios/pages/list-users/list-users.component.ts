import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableDataComponent } from '@molecules/table-data/table-data.component';
import { CTA_CARDS_USERS } from '../../utils/cta-cards-users.constant';
import { NavbarCardsCtaComponent } from '@organims/navbar-cards-cta/navbar-cards-cta.component';

import { IUserListResponse, IUserRegister } from '@core/models/auth/user-register.model';
import { ICtaCards } from '@interfaces/cta-cards.interface';

import { UserService } from '@services/users/users.service';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule, NavbarCardsCtaComponent, TableDataComponent],
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  private _users = inject(UserService);
  columnsUsers: string[] = ['id', 'tipoid', 'numid', 'name', 'lastname', 'email', 'show'];
  dataUsers: any[] = [];

  get ctaCards(): ICtaCards[] {
    return CTA_CARDS_USERS;
  }

  ngOnInit(): void {
    this._users.listUser().subscribe({
      next: (response: IUserListResponse) => {
        this.dataUsers = this.mapUserResponse(response.user);
        this._users.setUserData(this.dataUsers);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  mapUserResponse(users: IUserRegister[]) {
    return users.map((user) => {
      return {
        id: user.id,
        tipoid: user.tipoid,
        numid: user.numid,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        show: `/admin/usuarios/editar/${user.id}`,
      };
    });
  }
}
