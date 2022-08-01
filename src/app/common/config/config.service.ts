import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Config } from './config';
import { SKIP_AUTH_BEARER } from '../interceptors/auth.interceptor';

@Injectable({providedIn: 'root'})
export class ConfigService {

  configUrl = 'assets/config.json'; // moved from configurations folder to assets folder in angular.json

  constructor(private readonly http: HttpClient) {
  }

  getConfig(): Observable<Config> {
    return this.http.get<Config>(this.configUrl, {
      context: new HttpContext().set(SKIP_AUTH_BEARER, true)
    });
  }
}
