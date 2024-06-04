import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { HomePage } from './home.page';
import * as QrcodeGeneratorStore from './store/qrcode.reducer';
import { HomePageRoutingModule } from './home-routing.module';
import { QRCodeEffects } from './store/qrcode.effects';
import { ImagePickerComponent } from './image-picker/image-picker.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    StoreModule.forFeature(QrcodeGeneratorStore.qrcodeReaderKey, QrcodeGeneratorStore.reducer),
    EffectsModule.forFeature([QRCodeEffects])
  ],
  declarations: [HomePage, ImagePickerComponent]
})
export class HomePageModule {}
