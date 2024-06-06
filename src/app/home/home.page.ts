import { Component, OnInit, TemplateRef } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

import * as QrcodeGeneratorStore from '../store/qrcode.reducer';
import { Store } from '@ngrx/store';
import { deleteScannedDocument, setCurrentDocument, updateQRId, uploadQrCodeDocument } from '../store/qrcode.actions';
import { Observable } from 'rxjs';
import { selectIsUpdated, selectQrCodeDocument, selectQrId, selectScannedDocuments } from '../store/qrcode.selectors';
import { QrcodeService } from '../services/qrcode.service';
import { QRCodeDocument, ScannedDocument } from '../model/qrcode.model';
import { NgIfContext } from '@angular/common';
import { AlertController, IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  qrId$: Observable<string> = this.store.select(selectQrId);
  isUpdated$: Observable<boolean> = this.store.select(selectIsUpdated);
  qrCodeDocument$: Observable<QRCodeDocument | undefined> = this.store.select(selectQrCodeDocument);
  documents$: Observable<ScannedDocument[]> = this.store.select(selectScannedDocuments);

  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(
    private qrCodeService: QrcodeService,
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
      this.qrCodeService.presentAlert('Permission denied', 'Please grant camera permission to use the barcode scanner.');
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

  upload() {
    this.store.dispatch(uploadQrCodeDocument());
  }

  onDocumentClick(currentDocument: ScannedDocument, slidingItem?: IonItemSliding) {
    if (slidingItem) {
      slidingItem.close();
    }
    this.store.dispatch(setCurrentDocument({ currentDocument }));
  }

  onDelete(docId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.alertController.create({
      header: 'Atention',
      message: 'Are you sure you want to delete this document?',
      // inputs: [
      // {
      //   name: 'name1',
      //   type: 'text'
      // }],    
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, 
        {
          text: 'Ok',
          handler: (alertData) => {
            this.store.dispatch(deleteScannedDocument({ docId }));
          }
        }
      ]
    })
    .then(alert => alert.present());
  }
}
