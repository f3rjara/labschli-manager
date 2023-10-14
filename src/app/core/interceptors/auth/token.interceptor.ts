import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '@services/auth/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private _tokenService: TokenService
  ) {}

  /**
   * Interceptor para agregar el token de acceso a las peticiones Auth
   * @param request
   * @param next
   * @returns
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.addToken(request);
    return next.handle(request);
  }

  /**
   * Agrega el token de acceso a las peticiones Auth
   * @param request
   * @returns
   * @memberof TokenInterceptor
   */
  private addToken(request: HttpRequest<unknown>) {
    const token = this._tokenService.getToken();
    if (token) {
      const authReq = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return authReq;
    }
    return request;
  }
}
