import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TolbarTopComponent } from '@organims/tolbar-top/tolbar-top.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, TolbarTopComponent],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent {
  /**
   * Muestra el titulo de la página
   * @default 'Usuarios'
   * @type {string}
   * @memberof UsuariosComponent
   */
  titleToolbar: string = 'Perfil';
}
