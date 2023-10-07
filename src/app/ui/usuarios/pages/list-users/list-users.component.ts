import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICtaCards } from '@interfaces/cta-cards.interface';
import { TableDataComponent } from '@molecules/table-data/table-data.component';
import { CTA_CARDS_USERS } from '../../utils/cta-cards-users.constant';
import { NavbarCardsCtaComponent } from '@organims/navbar-cards-cta/navbar-cards-cta.component';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule, NavbarCardsCtaComponent, TableDataComponent],
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {


  get ctaCards(): ICtaCards[] {
    return CTA_CARDS_USERS
  }
}
