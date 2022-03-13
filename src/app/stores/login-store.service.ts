import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../services/auth.service";
import { RouteEnum } from "../enums/route.enum";
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class LoginStoreService {

  constructor(private readonly authService: AuthService,
              private readonly userService: UserService,
              private readonly router: Router) {
  }

  //////////////////////
  //  COMMANDS
  //////////////////////

  public login(username: string, password: string): void {
    this.authService.login(username, password).subscribe(() => {
      this.userService.getUser(username).subscribe(() => {
        this.router.navigate([RouteEnum.HOME]);
      });
    });
  }

  //////////////////////
  //  QUERIES
  //////////////////////

  public get form(): FormGroup {
    return new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }
}
