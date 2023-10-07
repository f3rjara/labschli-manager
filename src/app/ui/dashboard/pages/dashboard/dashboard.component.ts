import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TolbarTopComponent } from '@organims/tolbar-top/tolbar-top.component';
import { CardSmallComponent } from '@organims/card-small/card-small.component';
import { ICtaCards } from '@interfaces/cta-cards.interface';
import { CTA_CARDS } from '../../utils/cta-cards.constant';

/** ANGULAR MODULES */

const MATERIAL_MODULES = []

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ CommonModule, TolbarTopComponent, CardSmallComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  /**
   * Muestra el titulo de la página en navbar Top
   * @default 'Dashboard'
   * @type {string}
   * @memberof DashboardComponent
   */
  titleToolbar: string = 'Dashboard';

  get ctaCards(): ICtaCards[] {
    return CTA_CARDS
  }
}
