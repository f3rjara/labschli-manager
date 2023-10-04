import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { TolbarTopComponent } from '@organims/tolbar-top/tolbar-top.component';

const MATERIAL_MODULES = []

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ NgIf, TolbarTopComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  /**
   * Muestra el titulo de la página
   * @default 'Dashboard'
   * @type {string}
   * @memberof DashboardComponent
   */
  titleToolbar: string = 'Dashboard';
}
