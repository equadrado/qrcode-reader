import { Component, OnDestroy, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { v4 as uuidv4 } from 'uuid';

import * as QrcodeGeneratorStore from '../store/qrcode.reducer';
import { addCurrentDocument, setCurrentDocument } from '../store/qrcode.actions';
import { ScannedDocument } from '../model/qrcode.model';
import { selectCurrentDocument } from '../store/qrcode.selectors';

import * as pdfMake from 'pdfmake/build/pdfmake';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent  implements OnInit, OnDestroy {
  document$: Observable<ScannedDocument | undefined> = this.store.select(selectCurrentDocument);
  private documentSubscription: Subscription;

  usePicker = false;
  showPreview = true;
  selectedImage: string | undefined;
  selectedPDF: any | undefined;
  docType: string = 'IMAGE';

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

    this.documentSubscription = this.document$.subscribe((document) => 
      this.selectedImage = document?.docContent
    )
  }

  ngOnDestroy(): void {
    this.documentSubscription?.unsubscribe();
  }

  onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      return;
    }
    const sizeConfig = {
      width: this.docType === 'PDF' ? 850 : 300,
      heigth: this.docType === 'PDF' ? 1100 : undefined
    }
    Camera.getPhoto({
      ...sizeConfig,
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      // height: 320,
      // width: 300,
      resultType: CameraResultType.Base64,
      allowEditing: true,
      
    })
      .then(image => {
        const scanNewDocument: ScannedDocument = {
          docId: uuidv4(),
          docType: this.docType,
        } as ScannedDocument;
        this.selectedImage = `data:image/jpeg;base64,${image.base64String}`;

        if (this.docType === 'PDF') {
          let pdfContent: any;
          let docDefinition = {
            content: [
              {
                image: this.selectedImage,
              }
            ]
          }
          const pdfGenerator = pdfMake.createPdf(docDefinition);
          pdfGenerator.getBase64( async (base64) => {
            pdfContent = base64;
            console.log('PDF content internal', pdfContent);
            this.store.dispatch(setCurrentDocument({currentDocument: {
                ...scanNewDocument,
                docContent: `data:application/pdf;base64,${pdfContent}`
              }}
            ));
          });
        } else {
          this.store.dispatch(setCurrentDocument({currentDocument: {
            ...scanNewDocument,
            docContent: this.selectedImage
          }}
        ));
    }
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
