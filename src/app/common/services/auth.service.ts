import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Select } from '@ngxs/store';

import { AuthBusiness } from '../business/auth.business';
import { AuthState } from '../../features/auth/auth-state';
import { ConfigService } from '../config/config.service';

export const TOKEN_KEY = 'simulacoin_token';

@Injectable({providedIn: 'root'})
export class AuthService {

  @Select(AuthState.token) token$!: Observable<string | null>;

  constructor(private readonly configService: ConfigService,
              private readonly http: HttpClient) {
  }

  public login(username: string, password: string): Observable<string> {
    this.removeSession();
    const authUrl: string = this.configService.getConfigSnapshot().authUrl;
    return this.http.post<AuthBusiness>(authUrl, {username, password})
      .pipe(
        map((authResult: any) => {
          AuthService.setSession(authResult);
          return authResult;
        })
      );
  }

  public logout(): Observable<boolean> {
    this.removeSession();
    return of(true);
  }

  public removeSession(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  public static isLogged(): boolean {
    return localStorage.getItem(TOKEN_KEY) !== null;
  }

  private static setSession(authResult: AuthBusiness): void {
    localStorage.setItem(TOKEN_KEY, authResult.token);
  }
}
