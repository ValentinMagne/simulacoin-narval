import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../services/auth.service";
import { RouteEnum } from "../enums/route.enum";

@Injectable({
  providedIn: 'root'
})
export class MenuStoreService {

  constructor(private readonly authService: AuthService, private readonly router: Router) {
  }

  //////////////////////
  //  COMMANDS
  //////////////////////

  public logout(): void {
    this.authService.logout();
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
