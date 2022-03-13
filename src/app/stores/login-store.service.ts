import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginStoreService {

  private _currentUser$: ReplaySubject<User> = new ReplaySubject<User>(1);

  constructor(private readonly authService: AuthService,
              private readonly loginService: LoginService) {
  }

  //////////////////////
  //  COMMANDS
  //////////////////////

  public enter(): void {
    this.authService.login('simulacoin', 'azerty').subscribe(() => {
      this.loginService.getUser('simulacoin').subscribe((user: User) => {
        this._currentUser$.next(user);
      });
    });
  }

  //////////////////////
  //  QUERIES
  //////////////////////

  public get currentUser$(): Observable<User> {
    return this._currentUser$.asObservable();
  }
}
