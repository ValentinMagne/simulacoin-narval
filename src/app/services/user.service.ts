import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Observable, ReplaySubject, throwError } from 'rxjs';

import { Config } from '../config/config';
import { ConfigStoreService } from '../stores/config-store.service';
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _currentUser$: ReplaySubject<User> = new ReplaySubject<User>(1);

  constructor(private readonly configStore: ConfigStoreService,
              private readonly http: HttpClient) {
  }

  public getUser(username: string | null): Observable<User> {
    return this.configStore.config$.pipe(
      mergeMap((config: Config) => {
        return this.http.get<User>(`${config.userUrl}?username=${username}`).pipe(
          map((user: User) => {
            this._currentUser$.next(user);
            return user;
          })
        );
      }), catchError((err) => throwError(err))
    );
  }

  public buy(quantity: number): Observable<User> {
    return this.configStore.config$.pipe(
      mergeMap((config: Config) => {
        return this.http.put<User>(`${config.buyUrl}?price=${quantity}`, {}).pipe(
          map((user: User) => {
            this._currentUser$.next(user);
            return user;
          })
        );
      }), catchError((err) => throwError(err))
    );
  }

  public get currentUser$(): Observable<User> {
    return this._currentUser$.asObservable();
  }
}
