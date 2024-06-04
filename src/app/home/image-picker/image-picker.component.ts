import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';

import { v4 as uuidv4 } from 'uuid';

import * as QrcodeGeneratorStore from '../store/qrcode.reducer';
import { Store } from '@ngrx/store';
import { addCurrentDocument, setCurrentDocument } from '../store/qrcode.actions';
import { ScannedDocument } from '../model/qrcode.model';
import { selectCurrentDocument } from '../store/qrcode.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent  implements OnInit {
  document$: Observable<ScannedDocument | undefined> = this.store.select(selectCurrentDocument);

  usePicker = false;
  showPreview = true;
  selectedImage: string | undefined;

  constructor(
    private platform: Platform,
    private store: Store<QrcodeGeneratorStore.State>
  ) { }

  ngOnInit() {
    console.log('Mobile:', this.platform.is('mobile'));
    console.log('Hybrid:', this.platform.is('hybrid'));
    console.log('iOS:', this.platform.is('ios'));
    console.log('Android:', this.platform.is('android'));
    console.log('Desktop:', this.platform.is('desktop'));
    if (
      (this.platform.is('mobile') && !this.platform.is('hybrid')) ||
      this.platform.is('desktop')
    ) {
      this.usePicker = true;
    }
  }

  onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      return;
    }
    Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      // height: 320,
      width: 300,
      resultType: CameraResultType.Base64
    })
      .then(image => {
        this.selectedImage = 'data:image/jpeg;base64,'+image.base64String!;
        this.store.dispatch(setCurrentDocument({currentDocument: {
          docId: uuidv4(),
          docType: 'IMAGE',
          docContent: this.selectedImage
        } as ScannedDocument}))
      })
      .catch(error => {
        console.log(error);
        return false;
      });
  }

  onAddImage() {
    this.store.dispatch(addCurrentDocument());
    this.selectedImage = undefined;
  }

}
