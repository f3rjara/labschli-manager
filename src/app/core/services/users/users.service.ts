import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { IUserRegister } from "@app/core/models/auth/user-register.model";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class UserService{
  private userDataSubject = new BehaviorSubject<any>(null);

  setUserData(data: any): void {
    this.userDataSubject.next(data);
  }

  // Método para obtener los datos del usuario como un Observable
  getUserData(): Observable<any> {
    return this.userDataSubject.asObservable();
  }

  /**
   * Permite realizar peticiones HTTP.
   * @memberof AuthService
   * @private
   * @readonly
   */
  private _http = inject(HttpClient);

  listUser(){
    const url = `${environment.API_URL}/user/list`;
    return this._http.get<IUserRegister[]>(url);
  }


}
