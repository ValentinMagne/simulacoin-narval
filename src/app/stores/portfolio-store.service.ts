import { Injectable } from '@angular/core';
import { interval, Observable, ReplaySubject, Subscription } from "rxjs";
import { startWith, switchMap } from "rxjs/operators";

import { BitcoinService } from "../services/bitcoin.service";
import { PortfolioTransaction } from "../models/portfolio-transaction";
import { Transaction, User } from "../models/user";
import { UserService } from "../services/user.service";

@Injectable({providedIn: 'root'})
export class PortfolioStoreService {

  private _transactions$: ReplaySubject<PortfolioTransaction[]> = new ReplaySubject<PortfolioTransaction[]>(1);
  private subscription: Subscription | undefined;

  constructor(private readonly bitcoinService: BitcoinService, private readonly userService: UserService) {
  }

  //////////////////////
  //  COMMANDS
  //////////////////////

  public enter(): void {
    const refreshRateInSeconds = 60;
    this.subscription = interval(refreshRateInSeconds * 1000).pipe(
      startWith(0),
      switchMap(() => this.bitcoinService.getBitcoin())
    ).subscribe((btcExchangeRate: number) => {
      this.userService.currentUser$.subscribe((user: User) => {
        this._transactions$.next(PortfolioStoreService.getProcessedTransactions(user, btcExchangeRate));
      })
    })
  }

  public leave(): void {
    this.subscription?.unsubscribe();
  }

  //////////////////////
  //  QUERIES
  //////////////////////

  get transactions$(): Observable<PortfolioTransaction[]> {
    return this._transactions$.asObservable();
  }

  //////////////////////
  //  PRIVATE
  //////////////////////

  private static getProcessedTransactions(user: User, btcExchangeRate: number): PortfolioTransaction[] {
    return user.purse.transactions
      .filter((t: Transaction) => t.opened)
      .map((t: Transaction) => {
        const unit: number = +(t.invested / t.openedAt);
        const profitAndLoss: number = +((btcExchangeRate - t.openedAt) * unit);
        return new PortfolioTransaction(+unit.toFixed(6), t.invested, t.openedAt, t.openDate, +profitAndLoss.toFixed(2));
      });
  }
}
