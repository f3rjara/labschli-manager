import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CTA_CARDS_USERS_ADMIN } from '../../utils/cta-cards-users.constant';
import { ICtaCards } from '@interfaces/cta-cards.interface';
import { NavbarCardsCtaComponent } from '@organims/navbar-cards-cta/navbar-cards-cta.component';

// ANGULAR MATERIAL MODULES
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

/** ANGULAR MATERIAL MODULES */

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatButtonModule
];


@Component({
  selector: 'app-admin-user',
  standalone: true,
  imports: [CommonModule, NavbarCardsCtaComponent, ReactiveFormsModule,  ...MATERIAL_MODULES],
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
/**
 * Esta clase permite administrar los usuarios - Agregar y editar un usuario
 * @class AdminUserComponent
 * @constructor
 */
export class AdminUserComponent implements OnInit {

  /**
   * Permite crear un formulario reactivo para el inicio de sesión.
   * @param {FormBuilder} fb
   * @memberof LoginComponent
   * @private
   */
  private _fb = inject(FormBuilder);

  /**
   * Variable que contiene los datos de la ruta activa
   * @property {ActivatedRoute} _route
   * @private
   */
  private _route = inject(ActivatedRoute);

  /**
   * Variable que contiene el id del usuario
   * @property {string} userId
   * @public
   */
  userId: string | null = null;

  /**
   * Variable que comprueba si la ruta se encuentra en modo edición
   * @property {boolean} flagUserEdit
   * @public
   */

  flagUserEdit: boolean = false;

   /**
   * Permite crear un formulario reactivo para el inicio de sesión.
   * @type {FormGroup}
   * @memberof LoginComponent
   * @public
   */
   formNewUser!: FormGroup;

  /**
   * Select por defecto para rol de usuario
   * @property {string} selected
   * @public
   * @default 'option2'
   */
   selectedRole = 'user';

  /**
   * Variable que contiene los datos de los botones de acción
   * @property {ICtaCards[]} ctaCards
   * @public
   */
  get ctaCards(): ICtaCards[] {
    return CTA_CARDS_USERS_ADMIN
  }

  constructor() {
    this.userId = this._route.snapshot.paramMap.get('id') || null;
    this.flagUserEdit = this.userId ? true : false;
    this.buildForm();
  }

  ngOnInit(): void {
    console.log('this.userId', this.userId, this.flagUserEdit)
  }

  /**
   * Permite crear un formulario reactivo para la edición de un usuario.
   * @memberof AdminUserComponent
   * @private
   */
  private buildForm() {
    this.formNewUser = this._fb.nonNullable.group({
      nameUser: ['pepito', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      lastNameUser: ['rodriguez', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      tipoDoc: ['CC', [Validators.required]],
      documentUser: ['123456789', [Validators.required, Validators.minLength(3), Validators.maxLength(13)]],
      correoUser: ['pepito@gmail.com', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      phoneUser: ['123456789', [ Validators.minLength(3), Validators.maxLength(13)]],
      roleUser: ['user', [Validators.required]],
    });
  }


  /**
   * Obtner los datos del formulario de creación o edicion del usuario
   * @memberof AdminUserComponent
   */
  onSubmit(): void {
    console.log('this.formNewUser', this.formNewUser.value)
  }

}
