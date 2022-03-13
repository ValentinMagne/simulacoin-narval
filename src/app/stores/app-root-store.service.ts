import { Injectable } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { ConfigStoreService } from './config-store.service';

@Injectable({providedIn: 'root'})
export class AppRootStoreService {

  constructor(private readonly authService: AuthService,
              private readonly configStore: ConfigStoreService) {
  }

  //////////////////////
  //  COMMANDS
  //////////////////////

  public enter(): void {
    this.configStore.enter();
  }

  public leave(): void {
    this.authService.logout();
  }

}
