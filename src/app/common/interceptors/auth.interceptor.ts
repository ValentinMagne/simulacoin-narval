import { AuthService } from "../services/auth.service";
import { Injectable } from '@angular/core';
import { HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export const SKIP_AUTH_BEARER = new HttpContextToken(() => false);

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem(AuthService.TOKEN_KEY);
    if (req.context.get(SKIP_AUTH_BEARER) || !idToken) {
      return next.handle(req);
    }
    const cloned = req.clone({
      headers: req.headers.set('Authorization',
        'Bearer ' + idToken)
    });
    return next.handle(cloned);
  }
}
