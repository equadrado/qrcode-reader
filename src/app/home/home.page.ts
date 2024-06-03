import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Barcode, BarcodeScanner, ScanResult } from '@capacitor-mlkit/barcode-scanning';

import * as QrcodeGeneratorStore from './store/qrcode.reducer';
import { Store } from '@ngrx/store';
import { updateQRId } from './store/qrcode.actions';
import { Observable } from 'rxjs';
import { selectQrId } from './store/qrcode.selectors';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  qrId$: Observable<string> = this.store.select(selectQrId);

  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(
    private alertController: AlertController,
    private store: Store<QrcodeGeneratorStore.State>
  ) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();

    this.store.dispatch(updateQRId({ qrId: barcodes[0].rawValue! }));

    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
