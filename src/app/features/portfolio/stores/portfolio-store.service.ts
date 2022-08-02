import { Injectable } from '@angular/core';
import { interval, Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { startWith, switchMap } from "rxjs/operators";
import { Select, Store } from "@ngxs/store";

import { BitcoinService } from "../../../common/services/bitcoin.service";
import { FetchBitcoin } from "../../../common/bitcoin/fetch-bitcoin";
import { SellBitcoin } from "../../../common/user/sell-bitcoin";
import { UserBusiness } from "../../../common/business/user.business";
import { UserState } from "../../../common/user/user-state";

@Injectable({providedIn: 'root'})
export class PortfolioStoreService {

  @Select(UserState.user) user$!: Observable<UserBusiness | null>;
  private fetchBitcoinSubscription: Subscription | undefined;

  constructor(private readonly bitcoinService: BitcoinService,
              private readonly router: Router,
              private readonly store: Store) {
  }

  //////////////////////
  //  COMMANDS
  //////////////////////

  public enter(): void {
    const refreshRateInSeconds = 20;
    this.fetchBitcoinSubscription = interval(refreshRateInSeconds * 1000).pipe(
      startWith(0),
      switchMap(() => this.store.dispatch(FetchBitcoin))
    ).subscribe();
  }

  public leave(): void {
    this.fetchBitcoinSubscription?.unsubscribe();
  }

  public sell(transactionId: number) {
    this.store.dispatch(new SellBitcoin(transactionId));
  }
}
