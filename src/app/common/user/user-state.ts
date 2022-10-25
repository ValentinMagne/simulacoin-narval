import { Action, Selector, State, StateContext } from "@ngxs/store";
import { catchError, take, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { EMPTY, of, throwError } from "rxjs";

import { BitcoinService } from "../services/bitcoin.service";
import { BitcoinState } from "../bitcoin/bitcoin-state";
import { BuyBitcoin } from "./buy-bitcoin";
import { FetchUser } from "./fetch-user";
import { PortfolioHistoric } from "../../features/portfolio/models/portfolio-historic";
import { PortfolioTransaction } from "../../features/portfolio/models/portfolio-transaction";
import { PortfolioUtil } from "../../features/portfolio/utils/portfolio.util";
import { RouteEnum } from "../enums/route.enum";
import { SellBitcoin } from "./sell-bitcoin";
import { Transaction, UserBusiness } from "../business/user.business";
import { UserService } from "../services/user.service";
import { UserStateModel } from "./user-state-model";

@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: null
  }
})
@Injectable()
export class UserState {

  @Selector()
  static user(state: UserStateModel): UserBusiness | null {
    return state.user;
  }

  @Selector([BitcoinState.bitcoinRate])
  static openedTransactions(state: UserStateModel, bitcoinRate: number): PortfolioTransaction[] | undefined {
    return state.user?.purse.transactions
      .filter((t: Transaction) => t.opened)
      .map((t: Transaction) => {
        const unit: number = PortfolioUtil.getUnit(t.invested, t.openedAt);
        const profitAndLoss: number = PortfolioUtil.getProfitAndLoss(t.invested, t.openedAt, bitcoinRate);
        return new PortfolioTransaction(t.id, +unit.toFixed(6), t.invested, t.openedAt, t.openDate, +profitAndLoss.toFixed(2));
      });
  }

  @Selector()
  static historic(state: UserStateModel): PortfolioHistoric {
    const closedTransactions: Transaction[] | undefined = state.user?.purse.transactions.filter((t: Transaction) => !t.opened);
    const profitAndLoss: number = closedTransactions?.reduce((totalProfitAndLoss: number, t: Transaction) => {
      return totalProfitAndLoss + PortfolioUtil.getProfitAndLoss(t.invested, t.openedAt, t.closedAt);
    }, 0) || 0;
    return new PortfolioHistoric(profitAndLoss);
  }

  constructor(private readonly bitcoinService: BitcoinService,
              private readonly router: Router,
              private readonly userService: UserService) {
  }

  @Action(FetchUser)
  public fetchUser(ctx: StateContext<UserStateModel>) {
    return this.userService.getUser().pipe(
      take(1),
      tap((user: UserBusiness) => {
        ctx.patchState({
          user
        })
      }),
      catchError((err) => {
        this.router.navigate([RouteEnum.LOGIN]);
        return throwError(err);
      })
    )
  }

  @Action(BuyBitcoin)
  public buyBitcoin(ctx: StateContext<UserStateModel>, action: BuyBitcoin) {
    return this.bitcoinService.buy(action.quantity).pipe(
      take(1),
      tap((user: UserBusiness) => {
        ctx.patchState({
          user
        })
      }),
      catchError((err) => {
        this.router.navigate([RouteEnum.LOGIN]);
        return throwError(err);
      })
    );
  }

  @Action(SellBitcoin)
  public sellBitcoin(ctx: StateContext<UserStateModel>, action: SellBitcoin) {
    return this.bitcoinService.sell(action.transactionId).pipe(
      take(1),
      tap((user: UserBusiness) => {
        ctx.patchState({
          user
        })
      }),
      catchError(() => {
        // TODO Reproduce bug => block sell url, then check warning :
        // TODO Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?
        // TODO route is login but component is still portfolio
        this.router.navigate([RouteEnum.LOGIN]);
        return EMPTY;
        //return throwError(err);
      })
    )
  }
}
