import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import * as QrcodeReaderStore from './store/qrcode.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { QRCodeEffects } from './store/qrcode.effects';
import { BarcodeScanningModalComponent } from './qr-reader/barcode-scanning-modal/barcode-scanning-modal.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    StoreModule.forFeature(QrcodeReaderStore.qrcodeReaderKey, QrcodeReaderStore.reducer),
    EffectsModule.forFeature([QRCodeEffects])
  ],
  declarations: [HomePage, BarcodeScanningModalComponent]
})
export class HomePageModule {}
