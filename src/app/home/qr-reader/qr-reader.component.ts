import { Component, NgZone, OnInit } from '@angular/core';
import { DialogService } from '../services/dialog.service';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal/barcode-scanning-modal.component';
import {
  Barcode,
  BarcodeFormat,
  BarcodeScanner,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-qr-reader',
  templateUrl: './qr-reader.component.html',
  styleUrls: ['./qr-reader.component.scss'],
})
export class QrReaderComponent {

  constructor(
  ) { }

}
