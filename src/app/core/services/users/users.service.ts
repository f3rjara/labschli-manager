import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { IUserRegister } from "@app/core/models/auth/user-register.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class UserService{

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
