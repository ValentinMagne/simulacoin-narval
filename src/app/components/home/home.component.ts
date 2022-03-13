import { Component, OnInit } from '@angular/core';

import { LoginStoreService } from "../../stores/login-store.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public currentUser$ = this.loginStore.currentUser$;

  constructor(private readonly loginStore: LoginStoreService) {
  }

  ngOnInit(): void {
  }

}
