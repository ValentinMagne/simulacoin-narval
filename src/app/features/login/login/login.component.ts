import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { LoginStoreService } from "../stores/login-store.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  public showSpinner = this.loginStore.showSpinner$;
  public form: FormGroup = this.loginStore.form;

  constructor(private readonly loginStore: LoginStoreService) {
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
