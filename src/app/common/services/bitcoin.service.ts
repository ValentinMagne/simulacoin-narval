import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { BitcoinBusiness } from '../business/bitcoin.business';
import { Config } from '../config/config';
import { ConfigService } from '../config/config.service';
import { ConfigState } from '../config/config-state';
import { ConfigStoreService } from '../stores/config-store.service';
import { SKIP_AUTH_BEARER } from '../interceptors/auth.interceptor';
import { UserBusiness } from "../business/user.business";

@Injectable({providedIn: 'root'})
export class BitcoinService {

  @Select(ConfigState.config) config$!: Observable<Config>;

  constructor(private readonly configService: ConfigService,
              private readonly configStore: ConfigStoreService,
              private readonly http: HttpClient) {
  }

  public getBitcoin(): Observable<BitcoinBusiness> {
    const bitcoinUrl: string = this.configService.getConfigSnapshot().bitcoinUrl;
    return this.http.get<BitcoinBusiness>(bitcoinUrl, {
      headers: new HttpHeaders().set('Content-Type', 'text/plain'),
      context: new HttpContext().set(SKIP_AUTH_BEARER, true),
    });
  }

  public buy(quantity: number): Observable<UserBusiness> {
    const buyUrl: string = this.configService.getConfigSnapshot().buyUrl;
    return this.http.put<UserBusiness>(`${buyUrl}?quantity=${quantity}`, {});
  }

  public sell(transactionId: number): Observable<void> {
    return this.configStore.config$.pipe(
      mergeMap((config: Config) => {
        return this.http.put<void>(`${config.sellUrl}?transactionId=${transactionId}`, {});
      })
    );
  }
}
