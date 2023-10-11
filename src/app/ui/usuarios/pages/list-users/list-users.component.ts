import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICtaCards } from '@interfaces/cta-cards.interface';
import { TableDataComponent } from '@molecules/table-data/table-data.component';
import { CTA_CARDS_USERS } from '../../utils/cta-cards-users.constant';
import { NavbarCardsCtaComponent } from '@organims/navbar-cards-cta/navbar-cards-cta.component';
import { UserService } from '@app/core/services/users/users.service';
import { IUserRegister } from '@app/core/models/auth/user-register.model';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule, NavbarCardsCtaComponent, TableDataComponent],
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  private _users = inject(UserService);
  columnsUsers: string[] = ['id', 'tipoid', 'name', 'lastname', 'email'];
  dataUsers: any[] = [];

  get ctaCards(): ICtaCards[] {
    return CTA_CARDS_USERS;
  }

  ngOnInit(): void {
    this._users.listUser().subscribe({
      next: (users: IUserRegister[]) => {

        this.dataUsers = this.mapUserResponse(users);
        console.log(this.dataUsers);


      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  mapUserResponse(users: IUserRegister[]) {

    return users.map((element) => {
      return {
        id: element.id,
        tipoid: element.tipoid,
        name: element.name,
        lastname: element.lastname,
        email: element.email,
      };
    });


  }
}
