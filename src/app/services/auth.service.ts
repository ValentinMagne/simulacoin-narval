import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { AuthBusiness } from '../business/auth/auth.business';
import { Config } from '../config/config';
import { ConfigStoreService } from '../stores/config-store.service';
import { User } from "../models/user";
import { UserService } from "./user.service";

@Injectable({providedIn: 'root'})
export class AuthService {

  private static readonly TOKEN_KEY = 'id_token';
  private static readonly USERNAME_KEY = 'username';

  constructor(private readonly configStore: ConfigStoreService,
              private readonly http: HttpClient,
              private readonly loginService: UserService) {
  }

  public login(username: string, password: string): Observable<void> {
    this.logout();
    return this.configStore.config$.pipe(
      mergeMap((config: Config) => {
        return this.http.post<AuthBusiness>(config.authUrl, {username, password})
          .pipe(
            map((authResult: any) => {
              AuthService.setSession(authResult, username);
            })
          );
      })
    )
  }

  public logout(): void {
    localStorage.removeItem(AuthService.TOKEN_KEY);
    localStorage.removeItem(AuthService.USERNAME_KEY);
  }

  public tryLogin(): Observable<User> {
    if (AuthService.isLogged()) {
      return this.loginService.getUser(AuthService.getUserName());
    } else {
      return throwError(new Error("no credentials"));
    }
  }

  private static getUserName(): string | null {
    return localStorage.getItem(AuthService.USERNAME_KEY);
  }

  private static isLogged(): boolean {
    return localStorage.getItem(AuthService.TOKEN_KEY) !== null
      && localStorage.getItem(AuthService.USERNAME_KEY) !== null;
  }

  private static setSession(authResult: AuthBusiness, username: string): void {
    localStorage.setItem(AuthService.TOKEN_KEY, authResult.token);
    localStorage.setItem(AuthService.USERNAME_KEY, username);
  }
}
