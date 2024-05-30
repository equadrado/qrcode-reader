import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of, switchMap, tap } from 'rxjs';
import { QRCode } from '../model/qrcode.model';

import * as QrcodeGeneratorStore from '../store/qrcode.reducer';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {
  private firebaseURL: string = 'https://wcfsolutioneq.firebaseio.com/';
  private postURL: string = `${this.firebaseURL}qrcode.json`;
  
  constructor(
    private http: HttpClient, 
    store: Store<QrcodeGeneratorStore.State>
  ) {}

  generateQRCodeId() {
    return this.http.post<any>(this.postURL, {
      id: null,
      description: 'New description',
      details: 'Some detail'
    });
  }

  generateQRCodeData(qrId: string) {
    return `${this.postURL}/${qrId}`
  }
}
