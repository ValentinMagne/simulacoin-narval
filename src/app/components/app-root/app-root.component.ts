import { Component, OnDestroy, OnInit } from '@angular/core';

import { AppRootStoreService } from '../../stores/app-root-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss']
})
export class AppRootComponent implements OnInit, OnDestroy {
  title = 'simulacoin-narval';

  constructor(private readonly appRootStore: AppRootStoreService) {
  }

  ngOnInit(): void {
    this.appRootStore.enter();
  }

  ngOnDestroy(): void {
    this.appRootStore.leave();
  }
}
