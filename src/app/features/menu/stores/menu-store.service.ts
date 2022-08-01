import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';

import { Logout } from '../../auth/logout';
import { RouteEnum } from '../../../common/enums/route.enum';

@Injectable({
  providedIn: 'root'
})
export class MenuStoreService {

  constructor(private readonly router: Router,
              private readonly store: Store) {
  }

  //////////////////////
  //  COMMANDS
  //////////////////////

  public logout(): void {
    this.store.dispatch(Logout);
  }

  public goToHome(): void {
    this.navigate(RouteEnum.HOME);
  }

  public goToPortfolio(): void {
    this.navigate(RouteEnum.PORTFOLIO);
  }

  //////////////////////
  //  PRIVATE
  //////////////////////

  private navigate(route: RouteEnum): void {
    this.router.navigate([route]);
  }
}
