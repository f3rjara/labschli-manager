import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';
import { Router } from '@angular/router';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    NgClass,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  /**
   * Permite crear un formulario reactivo para el inicio de sesión.
   * @param {FormBuilder} fb
   * @memberof LoginComponent
   * @private
   */
  private _fb = inject(FormBuilder);

  /**
   * Permite redireccionar a la página de registro.
   * @param {Router} router
   * @memberof LoginComponent
   * @private
   */
  private _router = inject(Router);

  /**
   * Permite mostrar un mensaje de error tupo alera¿ta en caso de que el usuario o la contraseña sean incorrectos.
   * @memberof LoginComponent
   * @private
   * @readonly
   */
  private _snackBar = inject(MatSnackBar);

  /**
   * Permite mostrar u ocultar la contraseña del usuario.
   * @type {boolean}
   * @memberof LoginComponent
   * @public
   */
  showPassword = false;

  /**
   * Permite mostrar u ocultar el formulario de inicio de sesión.
   * @type {boolean}
   * @memberof LoginComponent
   * @public
   */
  showSpinner = false;


  /**
   * Permite crear un formulario reactivo para el inicio de sesión.
   * @type {FormGroup}
   * @memberof LoginComponent
   * @public
   */
  form!: FormGroup;

  constructor(){
    this.buildForm();
  }

  /**
   * Permite crear un formulario reactivo para el inicio de sesión.
   * @memberof LoginComponent
   * @private
   */
  private buildForm() {
    this.form = this._fb.nonNullable.group({
      email: ['admin@mail.com', [Validators.required, Validators.email]],
      password: ['admin123', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Permite controlar el inicio de sesión de un usuario.
   * @memberof LoginComponent
   * @public
   */
  onSubmit(): void {
    this.showSpinner = true;

    if( this.form.invalid ) {
      this.form.markAllAsTouched();
      this.showSpinner = false;
      this.openSnackBar('Invalid credentials', 'Close');
      return;
    }
    const { email, password } = this.form.getRawValue();

    //TODO: CONSUMIR EL SERVICIO DE AUTH PARA LOGIN
    this.showSpinner = false;
    this._router.navigate(['/admin']);
  }

  /**
  * Permite mostrar un mensaje de error tupo alera¿ta en caso de que el usuario o la contraseña sean incorrectos.
  * @param message
  * @param action
  */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 5000 });
  }
}
