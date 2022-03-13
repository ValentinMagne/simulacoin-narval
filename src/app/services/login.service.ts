import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Config } from '../config/config';
import { ConfigStoreService } from '../stores/config-store.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly configStore: ConfigStoreService, private readonly http: HttpClient) {
  }

  public getUser(username: string): Observable<any> {
    return this.configStore.config$.pipe(
      mergeMap((config: Config) => {
        return this.http.get(`${config.userUrl}?username=${username}`);
      })
    );
  }
}
