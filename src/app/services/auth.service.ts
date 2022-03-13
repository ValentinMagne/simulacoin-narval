import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthBusiness } from '../business/auth/auth.business';
import { ConfigStoreService } from '../stores/config-store.service';
import { Config } from '../config/config';

@Injectable({providedIn: 'root'})
export class AuthService {

  private static readonly TOKEN_KEY = 'id_token';

  constructor(private readonly configStore: ConfigStoreService, private readonly http: HttpClient) {
  }

  public login(username: string, password: string): Observable<void> {
    return this.configStore.config$.pipe(
      mergeMap((config: Config) => {
        return this.http.post(config.authUrl, {username, password})
          .pipe(
            map((authResult: any) => {
              AuthService.setSession(authResult);
            })
          );
      })
    )
  }

  public logout(): void {
    localStorage.removeItem(AuthService.TOKEN_KEY);
  }

  public isLogged(): boolean {
    return localStorage.getItem(AuthService.TOKEN_KEY) !== null;
  }

  private static setSession(authResult: AuthBusiness): void {
    localStorage.setItem(AuthService.TOKEN_KEY, authResult.token);
  }
}
