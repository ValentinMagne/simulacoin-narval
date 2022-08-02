import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { LoginStoreService } from "../stores/login-store.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public showSpinner = this.loginStore.showSpinner$;
  public form: FormGroup = this.loginStore.form;

  constructor(private readonly loginStore: LoginStoreService) {
  }

  ngOnInit(): void {
    this.loginStore.enter();
  }

  ngOnDestroy(): void {
    this.loginStore.leave();
  }

  submit() {
    this.loginStore.login(this.form.controls.username.value, this.form.controls.password.value);
  }

  loginWithTestAccount() {
    this.loginStore.login("test", "test");
  }
}
