import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Select } from '@ngxs/store';

import { AuthBusiness } from '../business/auth.business';
import { AuthState } from '../../features/auth/auth-state';
import { Config } from '../config/config';
import { ConfigService } from '../config/config.service';
import { UserBusiness } from '../business/user.business';
import { UserService } from './user.service';

export const TOKEN_KEY = 'simulacoin_token';

@Injectable({providedIn: 'root'})
export class AuthService {

  @Select(AuthState.token) token$!: Observable<string | null>;

  constructor(private readonly configService: ConfigService,
              private readonly http: HttpClient,
              private readonly loginService: UserService) {
  }

  public login(username: string, password: string): Observable<string> {
    this.removeSession();
    return this.configService.getConfig().pipe(
      switchMap((config: Config) => {
        return this.http.post<AuthBusiness>(config.authUrl, {username, password})
          .pipe(
            map((authResult: any) => {
              AuthService.setSession(authResult);
              return authResult;
            })
          );
      })
    )
  }

  public logout(): Observable<boolean> {
    this.removeSession();
    return of(true);
  }

  public removeSession(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  public tryLogin(): Observable<UserBusiness> {
    return this.token$?.pipe(
      switchMap((token: string | null) => {
        if (token || AuthService.isLogged()) {
          return this.loginService.getUser();
        } else {
          return throwError(new Error('no credentials'));
        }
      })
    );
  }

  public static isLogged(): boolean {
    return localStorage.getItem(TOKEN_KEY) !== null;
  }

  private static setSession(authResult: AuthBusiness): void {
    localStorage.setItem(TOKEN_KEY, authResult.token);
  }
}
