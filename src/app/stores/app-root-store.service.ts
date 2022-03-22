import { catchError } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from '../services/auth.service';
import { ConfigStoreService } from './config-store.service';
import { RouteEnum } from "../enums/route.enum";
import { UserService } from "../services/user.service";

@Injectable({providedIn: 'root'})
export class AppRootStoreService {

  constructor(private readonly authService: AuthService,
              private readonly configStore: ConfigStoreService,
              private readonly loginService: UserService,
              private readonly router: Router) {
  }

  //////////////////////
  //  COMMANDS
  //////////////////////

  public enter(): void {
    this.configStore.save().subscribe(() => {
      this.authService.tryLogin().pipe(
        catchError((err: Error) => {
          this.router.navigate([RouteEnum.LOGIN]);
          throw err;
        })
      ).subscribe();
    });
  }

  public leave(): void {
    this.authService.logout();
  }

}
