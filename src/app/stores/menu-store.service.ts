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
    this.router.navigate([RouteEnum.LOGIN])
  }

  public goToHome(): void {
    this.router.navigate([RouteEnum.HOME])
  }

  public goToPortfolio(): void {
    this.router.navigate([RouteEnum.PORTFOLIO])
  }
}
