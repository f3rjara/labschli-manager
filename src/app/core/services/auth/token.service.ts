import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  /**
   * Permite guardar el token en el local storage.
   *
   * @param {string} token
   * @memberof TokenService
   * @public
   * @returns {void}
   */
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  /**
   * Permite obtener el token del local storage.
   *
   * @returns {string}
   * @memberof TokenService
   * @public
   * @returns {string} token
   */
  getToken(): string | null{
    return localStorage.getItem('token') || null;
  }

  /**
   * Permite eliminar el token del local storage.
   *
   * @memberof TokenService
   * @public
   * @returns {void}
   */
  clearToken() {
    localStorage.removeItem('token');
  }
}
