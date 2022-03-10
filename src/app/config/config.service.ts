import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Config } from "./config";

@Injectable({providedIn: 'root'})
export class ConfigService {

  configUrl = 'assets/config.json'; // moved from configurations folder to assets folder in angular.json

  constructor(private readonly http: HttpClient) {
  }

  getConfig() {
    return this.http.get<Config>(this.configUrl);
  }
}
