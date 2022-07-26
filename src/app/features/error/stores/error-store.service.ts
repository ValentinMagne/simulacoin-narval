import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { RouteEnum } from "../../../common/enums/route.enum";

@Injectable({
  providedIn: 'root'
})
export class ErrorStoreService {

  constructor(private readonly router: Router) {
  }

  public retry(): void {
    this.router.navigate([RouteEnum.LOGIN])
  }
}
