import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Observable, ReplaySubject, throwError } from 'rxjs';

import { Config } from '../config/config';
import { ConfigStoreService } from '../stores/config-store.service';
import { UserBusiness } from '../business/user.business';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _currentUser$: ReplaySubject<UserBusiness> = new ReplaySubject<UserBusiness>(1);

  constructor(private readonly configStore: ConfigStoreService,
              private readonly http: HttpClient) {
  }

  public getUser(): Observable<UserBusiness> {
    return this.configStore.config$.pipe(
      mergeMap((config: Config) => {
        return this.http.get<UserBusiness>(`${config.userUrl}`).pipe(
          map((user: UserBusiness) => {
            this._currentUser$.next(user);
            return user;
          })
        );
      }), catchError((err) => throwError(err))
    );
  }

  public get currentUser$(): Observable<UserBusiness> {
    return this._currentUser$.asObservable();
  }
}
