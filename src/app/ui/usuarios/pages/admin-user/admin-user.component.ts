import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '@app/core/services/auth/auth.service';
import { UserService } from '@services/users/users.service';

import { IUser } from '@app/core/models/auth/user-register.model';
import { CTA_CARDS_USERS_ADMIN } from '../../utils/cta-cards-users.constant';
import { ICtaCards } from '@interfaces/cta-cards.interface';

import { NavbarCardsCtaComponent } from '@organims/navbar-cards-cta/navbar-cards-cta.component';
import { UploadFileComponent } from '@organims/upload-file/upload-file.component';

// ANGULAR MATERIAL MODULES
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

/** ANGULAR MATERIAL MODULES */

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatButtonModule,
  MatSnackBarModule,
];

@Component({
  selector: 'app-admin-user',
  standalone: true,
  imports: [CommonModule, NavbarCardsCtaComponent, ReactiveFormsModule, UploadFileComponent, RouterModule, ...MATERIAL_MODULES],
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss'],
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
   * Variable que permite navegar entre rutas
   * @property {ActivatedRoute} _routeNav
   * @private
   */
  private _routeNav = inject(Router);

  /**
   * Variable que contiene los datos del usuario
   * @property {AuthService} _auth
   * @private
   */
  private _auth = inject(AuthService);

  /**
   * Variable que contiene los datos del usuario
   * @property {UserService} _user
   * @private
   */
  private _user = inject(UserService);

  private _snackBar = inject(MatSnackBar);

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
    return CTA_CARDS_USERS_ADMIN;
  }

  constructor() {
    this.userId = this._route.snapshot.paramMap.get('id') || null;
    this.flagUserEdit = this.userId ? true : false;
    this.buildForm();
  }

  ngOnInit(): void {
    console.log('this.userId', this.userId, this.flagUserEdit);
    if (this.flagUserEdit) {
      this.getUserRegister();
    }
  }

  /**
   * Permite crear un formulario reactivo para la edición de un usuario.
   * @memberof AdminUserComponent
   * @private
   */
  private buildForm() {
    this.formNewUser = this._fb.nonNullable.group({
      nameUser: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      lastNameUser: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      tipoDoc: ['', [Validators.required]],
      documentUser: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(13)]],
      correoUser: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      phoneUser: ['', [Validators.minLength(3), Validators.maxLength(13)]],
      roleUser: ['', [Validators.required]],
    });
  }

  /**
   * Obtner los datos del formulario de creación o edicion del usuario
   * @memberof AdminUserComponent
   */
  onSubmit(): void {
    if (this.formNewUser.valid && !this.flagUserEdit) {
      this.registerUser();
    } else if (this.formNewUser.valid && this.flagUserEdit && this.userId) {
      this.updateUser();
    }
  }

  builderUser(formUser: any): IUser {
    return {
      numid: formUser.documentUser,
      tipoid: formUser.tipoDoc,
      name: formUser.nameUser,
      lastname: formUser.lastNameUser,
      phone: formUser.phoneUser,
      email: formUser.correoUser,
      rol: formUser.roleUser,
    };
  }

  registerUser(): void {
    console.log('this.formNewUser', this.formNewUser.value);
    const user: IUser = this.builderUser(this.formNewUser.value);
    this._auth.registerUser(user).subscribe({
      next: (response) => {
        if (response.error) {
          console.log('error');
          this._snackBar.open('Hubo un error al registrar el usuario', 'Upss', {
            duration: 3000,
          });
          return;
        }
        console.log(response.user);
        this._snackBar.open('Usuario registrado con exito', 'Listo!', {
          duration: 3000,
        });
        this.formNewUser.reset();
      },
      error: (error) => {
        console.log(error);
        this._snackBar.open('Hubo un error interno', 'Upss!', {
          duration: 3000,
        });
      },
    });
  }

  getUserRegister(): void {
    if (this.userId) {
      this._user.getUser(Number(this.userId)).subscribe({
        next: (response) => {
          if( response.error ) {
            this.flagUserEdit = false;
            this._snackBar.open('No se encontró el usuario', 'Upss!', {
              duration: 3000,
            });
            this._routeNav.navigate(['/admin/usuarios/list']);
          }
          const user = response.user;
          this.formNewUser.patchValue({
            nameUser: user.name,
            lastNameUser: user.lastname,
            tipoDoc: user.tipoid,
            documentUser: user.numid,
            correoUser: user.email,
            phoneUser: user.phone,
            roleUser: user.rol,
          });
        },
        error: (error) => {
          console.log(error);
          this._snackBar.open('No se encontró el usuario', 'Upss!', {
            duration: 3000,
          });
          this._routeNav.navigate(['/admin/usuarios/list']);
        },
      });
    }
  }

  updateUser(): void {
    const user: IUser = this.builderUser(this.formNewUser.value);
    this._user.updateUser(user, Number(this.userId)).subscribe({
      next: (response) => {
        if (response.error) {
          console.log('error');
          this._snackBar.open('Hubo un error al guardar el usuario', 'Upss', {
            duration: 3000,
          });
          return;
        }
        console.log(response.user);
        this.getUserRegister();
        this._snackBar.open('Usuario actualizado con exito', 'Listo!', {
          duration: 3000,
        });
      },
      error: (error) => {
        console.log(error);
        this._snackBar.open(error.error.message, 'Upss!', {
          duration: 3000,
        });
      },
    });
  }
}
