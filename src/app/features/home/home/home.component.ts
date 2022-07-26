import { Component, OnDestroy, OnInit } from '@angular/core';

import { UserService } from "../../../services/user.service";
import { HomeStoreService } from "../stores/home-store.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public currentUser$ = this.userService.currentUser$;
  public bitcoin$ = this.homeStore.bitcoin$;

  constructor(private readonly homeStore: HomeStoreService,
              private readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.homeStore.enter();
  }

  ngOnDestroy(): void {
    this.homeStore.leave();
  }

  public openBuyDialog(): void {
    this.homeStore.openBuyDialog();
  }
}
