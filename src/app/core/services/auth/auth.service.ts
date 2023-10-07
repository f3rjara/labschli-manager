import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';
import { IUserAuth } from '@core/models/auth/user.model';
import { LoginResponse } from '@core/models/auth/login-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Permite realizar peticiones HTTP.
   * @memberof AuthService
   * @private
   * @readonly
   */
  private _http = inject(HttpClient);

  /**
   * Permite realizar operaciones con el token.
   * @memberof AuthService
   * @private
   * @readonly
   */
  private _tokenService = inject(TokenService);

  /**
   * Permite almacenar el estado de la autenticación de un usuario.
   * @memberof AuthService
   * @private
   * @readonly
   */
  private _authState = new BehaviorSubject<IUserAuth | null>(null);
  authState$ = this._authState.asObservable();

  /**
   * Permite iniciar sesión de un usuario.
   * @param {string} email
   * @param {string} password
   * @returns
   */
  login(email: string, password: string) {
    const URL = `${environment.API_URL}/v1/auth/login`;
    return this._http.post<LoginResponse>(URL, {email, password})
    .pipe(
      tap(response => this._tokenService.saveToken(response.access_token)),
      switchMap(_ => this.getProfile()),
      tap(user => this._authState.next(user))
    )
  }

  /**
   * Establece el estado de la autenticación de un usuario.
   * @param {IUserAuth | null} user
   * @memberof AuthService
   * @public
   * @returns {void}
   */
  setAuthState(user: IUserAuth | null) {
    this._authState.next(user);
  }

  /**
   * Obtiene el perfil del usuario autenticado.
   * @memberof AuthService
   * @returns {void}
   */
  getProfile() {
    const url = `${environment.API_URL}/auth/profile`;
    return this._http.get<IUserAuth>(url);
  }

 /**
  * El usuario finaliza su sesión y elimina el token.
  * @memberof AuthService
  * @public
  * @returns {void}
  */
  logout() {
    this._tokenService.clearToken();
  }
}
