import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TolbarTopComponent } from '@organims/tolbar-top/tolbar-top.component';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, TolbarTopComponent],
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
}
