import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { ConfigStoreService } from './config-store.service';

@Injectable({providedIn: 'root'})
export class AppRootStoreService {

  constructor(private readonly authService: AuthService,
              private readonly configStore: ConfigStoreService,
              private readonly router: Router) {
  }

  //////////////////////
  //  COMMANDS
  //////////////////////

  public enter(): void {
    this.configStore.enter();
    if (!this.authService.isLogged()) {
      this.router.navigate(['login']);
    }
  }

  public leave(): void {
    this.authService.logout();
  }

}
