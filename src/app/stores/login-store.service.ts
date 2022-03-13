import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

import { AuthService } from "../services/auth.service";
import { RouteEnum } from "../enums/route.enum";
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class LoginStoreService {

  private readonly _form: FormGroup;

  constructor(private readonly authService: AuthService,
              private readonly snackBar: MatSnackBar,
              private readonly userService: UserService,
              private readonly router: Router) {
    this._form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  //////////////////////
  //  COMMANDS
  //////////////////////

  public login(username: string, password: string): void {
    this.snackBar.dismiss();
    this.authService.login(username, password).subscribe(() => {
      this.userService.getUser(username).subscribe(() => {
        this.router.navigate([RouteEnum.HOME]);
      });
    }, () => {
      this._form.reset();
      this.snackBar.open("Identifiant ou mot de passe incorrect", "Fermer");
    });
  }

  public leave(): void {
    this._form.reset();
    this.snackBar.dismiss();
  }

  //////////////////////
  //  QUERIES
  //////////////////////

  public get form(): FormGroup {
    return this._form;
  }
}
