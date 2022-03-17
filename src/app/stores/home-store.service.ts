import { Injectable } from '@angular/core';
import { interval, Observable, ReplaySubject, Subscription } from "rxjs";
import { startWith, switchMap } from "rxjs/operators";

import { BitcoinService } from "../services/bitcoin.service";
import { RouteEnum } from "../enums/route.enum";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class HomeStoreService {

  private _bitcoin$: ReplaySubject<number> = new ReplaySubject<number>(1);
  private subscription: Subscription | undefined;

  constructor(private readonly bitcoinService: BitcoinService,
              private readonly router: Router) {
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

  //////////////////////
  //  QUERIES
  //////////////////////

  get bitcoin$(): Observable<number> {
    return this._bitcoin$.asObservable();
  }
}
