import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { QRCodeDocument } from '../model/qrcode.model';

import * as QrcodeGeneratorStore from '../store/qrcode.reducer';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {
  private firebaseURL: string = 'https://wcfsolutioneq.firebaseio.com/';
  private baseURL: string = `${this.firebaseURL}qrcode/`;
  
  buttons: [
    {
      text: 'Okay',
      handler: () => {
      }
    }
  ]

  constructor(
    private http: HttpClient, 
    private alertController: AlertController,
    store: Store<QrcodeGeneratorStore.State>
  ) {}

  updateQRData(qrCodeDocument: QRCodeDocument, qrId: string) {
    return this.http.put<any>(`${this.baseURL}${qrId}.json`, qrCodeDocument);
  }

  getQRData(qrId: string) {
    return this.http.get<QRCodeDocument>(`${this.baseURL}${qrId}.json`);
  }

  presentAlert(header: string, message: string) {
    this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    })
    .then(alert => alert.present());
  }
}
