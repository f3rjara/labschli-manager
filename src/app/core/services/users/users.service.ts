import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser, IUserRegister, IUserRegisterReponse } from '@core/models/auth/user-register.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userDataSubject = new BehaviorSubject<any>(null);

  setUserData(data: any): void {
    this.userDataSubject.next(data);
  }

  // Método para obtener los datos del usuario como un Observable para Table
  getUserData(): Observable<any> {
    return this.userDataSubject.asObservable();
  }

  /**
   * Permite listar los isiarios de tipo 'user' registrados en el sistema
   * @memberof AuthService
   * @private
   * @readonly
   */
  private _http = inject(HttpClient);

  /**
   * Permite listar los isiarios de tipo 'user' registrados en el sistema
   * @memberof AuthService
   * */
  listUser() {
    const url = `${environment.API_URL}/user/list`;
    return this._http.get<IUserRegister[]>(url);
  }

  /**
   * Permite obtener un Uusuario registrado en el sistema
   *
   * @param {number} idUser
   * @memberof AuthService
   */

  getUser(idUser: number) {
    const url = `${environment.API_URL}/user/edit/${idUser}`;
    return this._http.get<IUserRegisterReponse>(url);
  }

  /**
   * Permite Actualizar un usuario en el sistema
   * @param user
   * @param idUser
   * @returns
   */
  updateUser(user: IUser, idUser: number) {
    const url = `${environment.API_URL}/user/update/${idUser}`;
    return this._http.post<IUserRegisterReponse>(url, user);
  }
}
