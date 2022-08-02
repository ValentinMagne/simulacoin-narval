import { Action, Selector, State, StateContext } from "@ngxs/store";
import { catchError, take, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";

import { BitcoinService } from "../services/bitcoin.service";
import { BuyBitcoin } from "./buy-bitcoin";
import { FetchUser } from "./fetch-user";
import { UserBusiness } from "../business/user.business";
import { UserService } from "../services/user.service";
import { UserStateModel } from "./user-state-model";
import { RouteEnum } from "../enums/route.enum";

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
      })
    );
  }
}
