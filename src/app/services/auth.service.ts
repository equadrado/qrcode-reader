import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import * as QrcodeGeneratorStore from '../store/qrcode.reducer';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectUser } from '../store/qrcode.selectors';
import { setUser } from '../store/qrcode.actions';
import { AuthResponseData } from '../model/qrcode.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService  implements OnDestroy {
  user$: Observable<User | undefined> = this.store.select(selectUser);
  private user: User | undefined;
  private userSubscription: Subscription;

  private _userId = 'quadrado.ca@gmail.com';

  private authSigninURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIkey}`
  private authSignupURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIkey}`
  private authGetTokenURL = `https://securetoken.googleapis.com/v1/token?key=${environment.firebaseAPIkey}`
  
  get userIsAuthenticated() {
    return !!this.user;
  }

  get userId() {
    return this._userId;
  }

  constructor(
    private http: HttpClient,
    private store: Store<QrcodeGeneratorStore.State>
  ) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.authSignupURL, {
      email,
      password,
      returnSecureToken: true
    });
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.authSigninURL, {
      email,
      password,
      returnSecureToken: true
    });
  }

  logout() {
    this.store.dispatch(setUser({ user: undefined }));
  }
}
