import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Platform } from '@ionic/angular';

import * as QrcodeReaderStore from './home/store/qrcode.reducer';
import { setPlatform } from './home/store/qrcode.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private store: Store<QrcodeReaderStore.State>
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.store.dispatch(setPlatform({ platform: this.platform.is('ios') ? 'ios' : 'other' }))
  }
}
