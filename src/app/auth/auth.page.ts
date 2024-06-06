import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import * as QrcodeGeneratorStore from '../store/qrcode.reducer';

import { Store } from '@ngrx/store';
import { login, signup } from '../store/qrcode.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage {
  isLoading = false;
  isLogin = true;

  constructor(
    // private authService: AuthService,
    // private router: Router,
    private store: Store<QrcodeGeneratorStore.State>
  ) {}

  authenticate(email: string, password: string) {
    this.isLoading = true;
    if (this.isLogin) {
      this.store.dispatch(login({ email, password }));
    } else {
      this.store.dispatch(signup({ email, password }));
    }
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.authenticate(email, password);
    form.reset();
  }

}
