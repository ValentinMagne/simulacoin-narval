import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from "@angular/router";

import { AuthBusiness } from '../business/auth.business';
import { Config } from '../config/config';
import { ConfigStoreService } from '../stores/config-store.service';
import { UserBusiness } from "../business/user.business";
import { UserService } from "./user.service";
import { RouteEnum } from "../enums/route.enum";

@Injectable({providedIn: 'root'})
export class AuthService {

  public static readonly TOKEN_KEY = 'simulacoin_token';

  constructor(private readonly configStore: ConfigStoreService,
              private readonly http: HttpClient,
              private readonly loginService: UserService,
              private readonly router: Router) {
  }

  public login(username: string, password: string): Observable<void> {
    this.removeSession();
    return this.configStore.config$.pipe(
      mergeMap((config: Config) => {
        return this.http.post<AuthBusiness>(config.authUrl, {username, password})
          .pipe(
            map((authResult: any) => {
              AuthService.setSession(authResult);
            })
          );
      })
    )
  }

  public logout(): void {
    this.removeSession();
    this.router.navigate([RouteEnum.LOGIN]);
  }

  public removeSession(): void {
    localStorage.removeItem(AuthService.TOKEN_KEY);
  }

  public tryLogin(): Observable<UserBusiness> {
    if (AuthService.isLogged()) {
      return this.loginService.getUser();
    } else {
      return throwError(new Error("no credentials"));
    }
  }

  private static isLogged(): boolean {
    return localStorage.getItem(AuthService.TOKEN_KEY) !== null;
  }

  private static setSession(authResult: AuthBusiness): void {
    localStorage.setItem(AuthService.TOKEN_KEY, authResult.token);
  }
}
