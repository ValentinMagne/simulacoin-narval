import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Config } from "./config/config";
import { ConfigService } from "./config/config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'simulacoin-narval';

  constructor(private readonly config: ConfigService, private readonly http: HttpClient) {
  }

  ngOnInit(): void {
    // TODO user environmentService (with synchronous call)
    this.config.getConfig().subscribe((config: Config) => {
      this.http.get(config.greetingUrl).subscribe((data: any) => {
        this.title = data.content;
      })
    })
  }
}
