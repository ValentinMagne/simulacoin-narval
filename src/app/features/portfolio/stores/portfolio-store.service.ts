import { Injectable } from '@angular/core';
import { interval, Observable, ReplaySubject, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { startWith, switchMap } from "rxjs/operators";

import { BitcoinService } from "../../../services/bitcoin.service";
import { PortfolioHistoric } from "../models/portfolio-historic";
import { PortfolioTransaction } from "../models/portfolio-transaction";
import { RouteEnum } from "../../../enums/route.enum";
import { Transaction, UserBusiness } from "../../../business/user.business";
import { UserService } from "../../../services/user.service";

@Injectable({providedIn: 'root'})
export class PortfolioStoreService {

  private _transactions$: ReplaySubject<PortfolioTransaction[]> = new ReplaySubject<PortfolioTransaction[]>(1);
  private _historic$: ReplaySubject<PortfolioHistoric> = new ReplaySubject<PortfolioHistoric>(1);
  private subscription: Subscription | undefined;

  constructor(private readonly bitcoinService: BitcoinService,
              private readonly router: Router,
              private readonly userService: UserService) {
  }

  //////////////////////
  //  COMMANDS
  //////////////////////

  public enter(): void {
    const refreshRateInSeconds = 20;
    this.subscription = interval(refreshRateInSeconds * 1000).pipe(
      startWith(0),
      switchMap(() => this.bitcoinService.getBitcoin())
    ).subscribe((btcExchangeRate: number) => {
      this.userService.currentUser$.subscribe((user: UserBusiness) => {
        this._transactions$.next(PortfolioStoreService.getProcessedTransactions(user, btcExchangeRate));
      })
    });
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
    this.subscription?.unsubscribe();
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
