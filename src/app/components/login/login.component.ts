import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { LoginStoreService } from '../../stores/login-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup = this.loginStore.form;
  public currentUser$ = this.loginStore.currentUser$;

  constructor(private readonly loginStore: LoginStoreService) {
  }

  ngOnInit(): void {
  }

  submit() {
    this.loginStore.login(this.form.controls.username.value, this.form.controls.password.value);
  }
}
