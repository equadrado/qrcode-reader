import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of, switchMap, tap } from 'rxjs';
import { QRCodeDocument, ScannedDocument } from '../model/qrcode.model';

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

  uploadDocument(scannedDocument: ScannedDocument) {
    return this.http.put<any>(this.postURL, scannedDocument);
  }

}
