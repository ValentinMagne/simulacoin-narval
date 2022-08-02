import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { take, tap } from "rxjs/operators";

import { BitcoinBusiness } from "../business/bitcoin.business";
import { BitcoinService } from "../services/bitcoin.service";
import { BitcoinStateModel } from "./bitcoin-state-model";
import { FetchBitcoin } from "./fetch-bitcoin";

@State<BitcoinStateModel>({
  name: 'bitcoin',
  defaults: {
    bitcoin: null
  }
})
@Injectable()
export class BitcoinState {

  @Selector()
  static bitcoinRate(state: BitcoinStateModel): number {
    if (state.bitcoin) {
      return +state.bitcoin.bpi.USD.rate_float.toFixed(2);
    } else {
      return 0;
    }
  }

  constructor(private readonly bitcoinService: BitcoinService) {
  }

  @Action(FetchBitcoin)
  public fetchBitcoin(ctx: StateContext<BitcoinStateModel>) {
    return this.bitcoinService.getBitcoin().pipe(
      take(1),
      tap((bitcoin: BitcoinBusiness) => {
        ctx.patchState({
          bitcoin
        })
      })
    )
  }
}
