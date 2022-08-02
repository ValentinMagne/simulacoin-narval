import { Injectable } from '@angular/core';
import { interval, Observable, ReplaySubject, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { startWith, switchMap } from "rxjs/operators";
import { Select, Store } from "@ngxs/store";

import { BitcoinService } from "../../../common/services/bitcoin.service";
import { FetchBitcoin } from "../../../common/bitcoin/fetch-bitcoin";
import { PortfolioHistoric } from "../models/portfolio-historic";
import { PortfolioTransaction } from "../models/portfolio-transaction";
import { RouteEnum } from "../../../common/enums/route.enum";
import { Transaction, UserBusiness } from "../../../common/business/user.business";
import { UserService } from "../../../common/services/user.service";
import { UserState } from "../../../common/user/user-state";
import { BitcoinState } from "../../../common/bitcoin/bitcoin-state";
import { FetchUser } from "../../../common/user/fetch-user";

@Injectable({providedIn: 'root'})
export class PortfolioStoreService {

  private _transactions$: ReplaySubject<PortfolioTransaction[]> = new ReplaySubject<PortfolioTransaction[]>(1);
  private _historic$: ReplaySubject<PortfolioHistoric> = new ReplaySubject<PortfolioHistoric>(1);
  @Select(UserState.user) user$!: Observable<UserBusiness | null>;
  @Select(BitcoinState.bitcoinRate) bitcoinRate$!: Observable<number>;
  private fetchBitcoinSubscription: Subscription | undefined;

  constructor(private readonly bitcoinService: BitcoinService,
              private readonly router: Router,
              private readonly store: Store,
              private readonly userService: UserService) {
  }

  //////////////////////
  //  COMMANDS
  //////////////////////

  public enter(): void {
    this.store.dispatch(FetchUser);
    const refreshRateInSeconds = 20;
    this.fetchBitcoinSubscription = interval(refreshRateInSeconds * 1000).pipe(
      startWith(0),
      switchMap(() => this.store.dispatch(FetchBitcoin))
    ).subscribe();
    this.userService.currentUser$.subscribe((user: UserBusiness) => {
      const closedTransactions: Transaction[] = user.purse.transactions.filter((t: Transaction) => !t.opened);
      const profitAndLoss = closedTransactions.reduce((totalProfitAndLoss: number, t: Transaction) => {
        return totalProfitAndLoss + PortfolioStoreService.getProfitAndLoss(t.invested, t.openedAt, t.closedAt);
      }, 0);
      const historic: PortfolioHistoric = new PortfolioHistoric(profitAndLoss);
      this._historic$.next(historic);
    });
  }

  public leave(): void {
    this.fetchBitcoinSubscription?.unsubscribe();
  }

  public sell(transactionId: number) {
    this.bitcoinService.sell(transactionId)
      .pipe(
        switchMap(_ => this.userService.getUser())
      )
      .subscribe(_ => {
      }, _ => this.router.navigate([RouteEnum.ERROR]));
  }

  //////////////////////
  //  QUERIES
  //////////////////////

  get transactions$(): Observable<PortfolioTransaction[]> {
    return this._transactions$.asObservable();
  }

  get historic$(): Observable<PortfolioHistoric> {
    return this._historic$.asObservable();
  }

  //////////////////////
  //  PRIVATE
  //////////////////////

  private static getProcessedTransactions(user: UserBusiness, btcExchangeRate: number): PortfolioTransaction[] {
    return user.purse.transactions
      .filter((t: Transaction) => t.opened)
      .map((t: Transaction) => {
        const unit: number = PortfolioStoreService.getUnit(t.invested, t.openedAt);
        const profitAndLoss: number = PortfolioStoreService.getProfitAndLoss(t.invested, t.openedAt, btcExchangeRate);
        return new PortfolioTransaction(t.id, +unit.toFixed(6), t.invested, t.openedAt, t.openDate, +profitAndLoss.toFixed(2));
      });
  }

  private static getProfitAndLoss(invested: number, openedAt: number, closedAt: number): number {
    return +((closedAt - openedAt) * PortfolioStoreService.getUnit(invested, openedAt));
  }

  private static getUnit(invested: number, openedAt: number): number {
    return +(invested / openedAt);
  }
}
