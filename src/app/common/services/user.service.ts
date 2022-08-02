import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Select } from "@ngxs/store";

import { Config } from '../config/config';
import { ConfigState } from "../config/config-state";
import { UserBusiness } from '../business/user.business';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  @Select(ConfigState.config) config$!: Observable<Config>;

  constructor(private readonly http: HttpClient) {
  }

  public getUser(): Observable<UserBusiness> {
    return this.config$.pipe(
      switchMap((config: Config) => {
        return this.http.get<UserBusiness>(config.userUrl).pipe(
          take(1),
          map((user: UserBusiness) => {
            return user;
          })
        );
      }), catchError((err) => throwError(err))
    );
  }
}
