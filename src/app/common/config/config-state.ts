import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";

import { Config } from "./config";
import { ConfigService } from "./config.service";
import { ConfigStateModel } from "./config-state-model";
import { SaveConfig } from "./save-config";

@State<ConfigStateModel>({
  name: 'config',
  defaults: {
    config: {} as Config
  }
})
@Injectable()
export class ConfigState {

  @Selector()
  static config(state: ConfigStateModel): Config {
    return state.config;
  }

  constructor(private configService: ConfigService) {
  }

  @Action(SaveConfig)
  public save(ctx: StateContext<ConfigStateModel>) {
    return this.configService.getConfig().pipe(
      tap((config: Config) => {
        ctx.patchState({
          config: config
        })
      })
    )
  }
}
