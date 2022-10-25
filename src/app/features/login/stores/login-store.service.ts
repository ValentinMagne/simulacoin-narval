import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from '../../../common/services/auth.service';
import { AuthState } from "../../auth/auth-state";
import { FetchUser } from "../../../common/user/fetch-user";
import { Login } from '../../auth/login';
import { RouteEnum } from '../../../common/enums/route.enum';

@Injectable({
  providedIn: 'root'
})
export class LoginStoreService {

  @Select(AuthState.isAuthenticated) isAuthenticated$!: Observable<boolean>;
  private _showSpinner$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly _form: FormGroup;

  constructor(private readonly authService: AuthService,
              private readonly snackBar: MatSnackBar,
              private readonly router: Router,
              private readonly store: Store) {
    this._form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  //////////////////////
  //  COMMANDS
  //////////////////////

  public enter(): void {
    this.store.dispatch(FetchUser).subscribe(() => this.router.navigate([RouteEnum.HOME]));
  }

  public login(username: string, password: string): void {
    this._showSpinner$.next(true);
    this.snackBar.dismiss();
    this.store
      .dispatch(new Login({username, password}))
      .subscribe(() => {
        this.store.dispatch(FetchUser)
          .subscribe(
            () => this.router.navigate([RouteEnum.HOME]),
            () => this.router.navigate([RouteEnum.ERROR])
          );
      }, () => {
        this._form.reset();
        this._showSpinner$.next(false);
        this.snackBar.open('Identifiant ou mot de passe incorrect', 'Fermer');
      });
  }

  public leave(): void {
    this._showSpinner$.next(false);
    this._form.reset();
    this.snackBar.dismiss();
  }

  //////////////////////
  //  QUERIES
  //////////////////////

  public get form(): FormGroup {
    return this._form;
  }

  public get showSpinner$(): Observable<boolean> {
    return this._showSpinner$.asObservable();
  }
}
