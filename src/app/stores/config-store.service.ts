import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { Config } from '../config/config';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigStoreService {

  private _config$: ReplaySubject<Config> = new ReplaySubject<Config>(1);

  constructor(private readonly config: ConfigService) {
  }

  public enter(): void {
    this.config.getConfig()
      .pipe(take(1))
      .subscribe((config: Config) => {
        this._config$.next(config);
      })
  }

  //////////////////////
  //  QUERIES
  //////////////////////

  public get config$(): Observable<Config> {
    return this._config$.asObservable();
  }
}
