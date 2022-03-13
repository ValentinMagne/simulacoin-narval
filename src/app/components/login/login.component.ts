import { Component, OnInit } from '@angular/core';

import { LoginStoreService } from '../../stores/login-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public currentUser$ = this.loginStore.currentUser$;

  constructor(private readonly loginStore: LoginStoreService) {
  }

  ngOnInit(): void {
    this.loginStore.enter();
  }
}
