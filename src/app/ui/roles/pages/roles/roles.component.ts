import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TolbarTopComponent } from '@organims/tolbar-top/tolbar-top.component';
import { NavbarCardsCtaComponent } from '@app/shared/components/organims/navbar-cards-cta/navbar-cards-cta.component';
import { RouterModule } from '@angular/router';
import { ICtaCards } from '@app/shared/interfaces/cta-cards.interface';
import { CTA_CARDS_ROLES } from '../../utils/cta-cards-roles.constant';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, TolbarTopComponent, NavbarCardsCtaComponent, RouterModule],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent {

  /**
   * Muestra el titulo de la página
   * @default 'Usuarios'
   * @type {string}
   * @memberof UsuariosComponent
   */
  titleToolbar: string = 'Roles';


  ctaCards: ICtaCards[] = CTA_CARDS_ROLES;
}
