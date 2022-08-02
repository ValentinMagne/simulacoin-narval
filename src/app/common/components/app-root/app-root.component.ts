import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";

import { AppRootStoreService } from '../../stores/app-root-store.service';
import { FetchUser } from "../../user/fetch-user";
import { RouteEnum } from "../../enums/route.enum";

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss']
})
export class AppRootComponent implements OnInit, OnDestroy {

  constructor(private readonly appRootStore: AppRootStoreService,
              private readonly router: Router,
              private readonly store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(FetchUser).subscribe(() => this.router.navigate([RouteEnum.HOME]));
    this.appRootStore.enter();
  }

  ngOnDestroy(): void {
    this.appRootStore.leave();
  }
}
