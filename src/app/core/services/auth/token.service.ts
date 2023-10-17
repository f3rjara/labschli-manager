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
  saveToken(token: string, expires_in: number) {
    localStorage.setItem('labchsl_log', token);
    localStorage.setItem('labchsl_log_expires', String(expires_in));
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
    return localStorage.getItem('labchsl_log') || null;
  }

  /**
   * Permite eliminar el token del local storage.
   *
   * @memberof TokenService
   * @public
   * @returns {void}
   */
  clearToken() {
    localStorage.removeItem('labchsl_log');
    localStorage.removeItem('labchsl_log_expires');
  }
}
