import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Select } from "@ngxs/store";

import { BitcoinState } from "../../../common/bitcoin/bitcoin-state";
import { HomeStoreService } from "../stores/home-store.service";
import { UserBusiness } from "../../../common/business/user.business";
import { UserState } from "../../../common/user/user-state";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @Select(UserState.user) user$!: Observable<UserBusiness | null>;
  @Select(BitcoinState.bitcoinRate) bitcoinRate$!: Observable<number>;

  constructor(private readonly homeStore: HomeStoreService) {
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
