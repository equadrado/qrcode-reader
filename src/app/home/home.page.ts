import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as QrcodeReaderStore from './store/qrcode.reducer';
import { selectPlatform, selectQrId } from './store/qrcode.selectors';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  qrId$: Observable<string> = this.store.select(selectQrId);
  platform$: Observable<string> = this.store.select(selectPlatform);

  constructor(
    private store: Store<QrcodeReaderStore.State>
  ) {
  }

  readQRCode() {

  }
}
