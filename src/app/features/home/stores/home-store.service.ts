import { Injectable } from '@angular/core';
import { interval, Observable, Subscription } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Select, Store } from "@ngxs/store";

import { BitcoinService } from "../../../common/services/bitcoin.service";
import { BuyBitcoin } from "../../../common/user/buy-bitcoin";
import { BuyDialogComponent } from "../buy-dialog/buy-dialog.component";
import { BuyDialogData } from "../models/buy-dialog-data";
import { Config } from "../../../common/config/config";
import { ConfigService } from "../../../common/config/config.service";
import { ConfigState } from "../../../common/config/config-state";
import { FetchBitcoin } from "../../../common/bitcoin/fetch-bitcoin";

@Injectable({providedIn: 'root'})
export class HomeStoreService {

  @Select(ConfigState.config) config$!: Observable<Config | null>;
  private fetchBitcoinSubscription: Subscription | undefined;

  constructor(public dialog: MatDialog,
              private readonly bitcoinService: BitcoinService,
              private readonly configService: ConfigService,
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
      map(() => {
        this.store.dispatch(FetchBitcoin);
      })
    ).subscribe();
  }

  public leave(): void {
    this.fetchBitcoinSubscription?.unsubscribe();
  }

  public openBuyDialog(): void {
    const dialogRef = this.dialog.open(BuyDialogComponent, {
      data: {} as BuyDialogData,
    });

    dialogRef.afterClosed().subscribe(quantity => {
      this.onDialogClosed(quantity);
    });
  }

  //////////////////////
  //  PRIVATE
  //////////////////////

  private onDialogClosed(quantity: number | undefined): void {
    if (quantity !== undefined) {
      this.store.dispatch(new BuyBitcoin(quantity));
    }
  }
}
