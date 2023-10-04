import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TolbarTopComponent } from '@organims/tolbar-top/tolbar-top.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, TolbarTopComponent],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {

  /**
   * Muestra el titulo de la página
   * @default 'Usuarios'
   * @type {string}
   * @memberof UsuariosComponent
   */
  titleToolbar: string = 'Usuarios';

}
