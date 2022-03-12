import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { AuthService } from "./services/auth.service";
import { Config } from "./config/config";
import { ConfigService } from "./config/config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'simulacoin-narval';

  constructor(private readonly authService: AuthService,
              private readonly config: ConfigService,
              private readonly http: HttpClient) {
  }

  ngOnInit(): void {
    this.config.getConfig().subscribe((config: Config) => {
      this.authService.login(config.authUrl).subscribe(() => {
        this.http.get(config.userUrl).subscribe((data: any) => {
          this.title = data.username;
        })
      });
    })
  }

  ngOnDestroy(): void {
    this.authService.logout();
  }
}
