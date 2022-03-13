import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, ReplaySubject } from 'rxjs';
import { Router } from "@angular/router";

import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginStoreService {

  private _currentUser$: ReplaySubject<User> = new ReplaySubject<User>(1);

  constructor(private readonly authService: AuthService,
              private readonly loginService: LoginService,
              private readonly router: Router) {
  }

  //////////////////////
  //  COMMANDS
  //////////////////////

  public login(username: string, password: string): void {
    this.authService.login(username, password).subscribe(() => {
      this.loginService.getUser(username).subscribe((user: User) => {
        this._currentUser$.next(user);
        this.router.navigate(['home']);
      });
    });
  }

  //////////////////////
  //  QUERIES
  //////////////////////

  public get currentUser$(): Observable<User> {
    return this._currentUser$.asObservable();
  }

  public get form(): FormGroup {
    return new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }
}
