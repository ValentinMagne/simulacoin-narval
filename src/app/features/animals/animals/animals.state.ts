import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { AddAnimal } from './animal.actions';
import { AnimalsStateModel } from './animals-state-model';
import { BitcoinService } from '../../../common/services/bitcoin.service';

@State<AnimalsStateModel>({
  name: 'zoo',
  defaults: {
    name: ''
  }
})
@Injectable()
export class AnimalsState {

  constructor(private readonly bitcoinService: BitcoinService) {
  }

  @Action(AddAnimal)
  addAnimal(ctx: StateContext<AnimalsStateModel>, action: AddAnimal) {
    return this.bitcoinService.getBitcoinThatFails().pipe(
      tap(() => {
        console.warn('AnimalsState', action.name);
        ctx.patchState({
          name: action.name
        });
      })
    )
  }
}
