import { Injectable } from '@angular/core';
import { interval, Observable, ReplaySubject, Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { startWith, switchMap } from "rxjs/operators";

import { BitcoinService } from "../services/bitcoin.service";
import { BuyDialogComponent } from "../components/buy-dialog/buy-dialog.component";
import { BuyDialogData } from "../models/buy-dialog-data";
import { RouteEnum } from "../enums/route.enum";
import { UserService } from "../services/user.service";

@Injectable({providedIn: 'root'})
export class HomeStoreService {

  private _bitcoin$: ReplaySubject<number> = new ReplaySubject<number>(1);
  private subscription: Subscription | undefined;

  constructor(public dialog: MatDialog,
              private readonly bitcoinService: BitcoinService,
              private readonly router: Router,
              private readonly userService: UserService) {
  }

  //////////////////////
  //  COMMANDS
  //////////////////////

  public enter(): void {
    const refreshRateInSeconds = 60;
    this.subscription = interval(refreshRateInSeconds * 1000).pipe(
      startWith(0),
      switchMap(() => this.bitcoinService.getBitcoin())
    ).subscribe((btcExchangeRate: number) => this._bitcoin$.next(btcExchangeRate),
      () => this.router.navigate([RouteEnum.LOGIN]));
  }

  public leave(): void {
    this.subscription?.unsubscribe();
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
  //  QUERIES
  //////////////////////

  public get bitcoin$(): Observable<number> {
    return this._bitcoin$.asObservable();
  }

  //////////////////////
  //  PRIVATE
  //////////////////////

  private onDialogClosed(quantity: number | undefined): void {
    if (quantity !== undefined) {
      this.bitcoinService.buy(quantity)
        .pipe(
          switchMap(_ => this.userService.getUser())
        )
        .subscribe(_ => {
        }, _ => this.router.navigate([RouteEnum.ERROR]));
    }
  }
}
