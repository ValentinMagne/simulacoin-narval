import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { BitcoinBusiness } from '../business/bitcoin.business';
import { Config } from '../config/config';
import { ConfigService } from '../config/config.service';
import { ConfigStoreService } from '../stores/config-store.service';
import { SKIP_AUTH_BEARER } from '../interceptors/auth.interceptor';

@Injectable({providedIn: 'root'})
export class BitcoinService {

  constructor(private readonly configService: ConfigService,
              private readonly configStore: ConfigStoreService,
              private readonly http: HttpClient) {
  }

  public getBitcoin(): Observable<number> {
    return this.configService.getConfig().pipe(
      switchMap((config: Config) => {
        return this.http.get<BitcoinBusiness>(config.bitcoinUrl, {
          headers: new HttpHeaders().set('Content-Type', 'text/plain'),
          context: new HttpContext().set(SKIP_AUTH_BEARER, true),
        }).pipe(
          map((data: BitcoinBusiness) => +data.bpi.USD.rate_float.toFixed(2))
        );
      })
    );
  }

  public buy(quantity: number): Observable<void> {
    return this.configStore.config$.pipe(
      mergeMap((config: Config) => {
        return this.http.put<void>(`${config.buyUrl}?quantity=${quantity}`, {});
      })
    );
  }

  public sell(transactionId: number): Observable<void> {
    return this.configStore.config$.pipe(
      mergeMap((config: Config) => {
        return this.http.put<void>(`${config.sellUrl}?transactionId=${transactionId}`, {});
      })
    );
  }

  /**
   * TODO To be removed
   * Failing because of this.configStore.config$
   * instead of using this.configService.getConfig()
   */
  public getBitcoinThatFails(): Observable<number> {
    return this.configStore.config$.pipe(
      switchMap((config: Config) => {
        return this.http.get<BitcoinBusiness>(config.bitcoinUrl, {
          headers: new HttpHeaders().set('Content-Type', 'text/plain'),
          context: new HttpContext().set(SKIP_AUTH_BEARER, true),
        }).pipe(
          map((data: BitcoinBusiness) => +data.bpi.USD.rate_float.toFixed(2))
        );
      })
    );
  }
}
