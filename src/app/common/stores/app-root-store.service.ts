import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { ConfigStoreService } from './config-store.service';
import { FetchUser } from "../user/fetch-user";
import { Logout } from '../../features/auth/logout';
import { RouteEnum } from '../enums/route.enum';
import { UserService } from '../services/user.service';

@Injectable({providedIn: 'root'})
export class AppRootStoreService {

  constructor(private readonly actions: Actions,
              private readonly authService: AuthService,
              private readonly configStore: ConfigStoreService,
              private readonly loginService: UserService,
              private readonly router: Router,
              private readonly store: Store) {
  }

  //////////////////////
  //  COMMANDS
  //////////////////////

  public enter(): void {
    this.store.dispatch(FetchUser);
    this.actions.pipe(ofActionDispatched(Logout)).subscribe(() => {
      this.router.navigate([RouteEnum.LOGIN]);
    });
  }

  public leave(): void {
    this.authService.removeSession();
  }

}
