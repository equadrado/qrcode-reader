import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { EMPTY, catchError, mergeMap, of, switchMap, take, tap, withLatestFrom } from "rxjs";

import { QrcodeService } from "../services/qrcode.service";
import * as QrcodeReaderStore from './qrcode.reducer';
import { setError, setPlatform, updateQRId, setQRCodeDocument, uploadQrCodeDocument, changeIsUpdated } from "./qrcode.actions";
import { selectQrCodeDocument, selectQrId, selectScannedDocuments } from "./qrcode.selectors";
import { QRCodeDocument, QRError } from "../model/qrcode.model";

@Injectable()
export class QRCodeEffects {
   qrId$ = this.store.select(selectQrId);
   qrCodeDocument$ = this.store.select(selectQrCodeDocument);
   scannedDocuments$ = this.store.select(selectScannedDocuments);

   constructor(
      private actions$: Actions,
      private store: Store<QrcodeReaderStore.State>,
      private qrcodeService: QrcodeService,
   ) {}

   setPlaform$ = createEffect(() => 
      this.actions$.pipe(
         ofType(setPlatform),
         tap((platform) => console.log(`Application running on ${platform}`))
      )
   );

   setError$ = createEffect(() => 
      this.actions$.pipe(
         ofType(setError),
         take(1),
         tap((error) => {
            console.log('QR error Alert', JSON.stringify(error));
            const header = error.error?.hasOwnProperty('header') ? error.error.header : 'Error'; 
            const message = error.error?.hasOwnProperty('message') ? error.error.message : JSON.stringify(error); 
            
            this.qrcodeService.presentAlert(header, message);
         }),
         switchMap((error) => [
            updateQRId({ qrId: '' })
         ])
      ))
   ;

   updateQRId$ = createEffect(() => 
      this.actions$.pipe(
         ofType(updateQRId),
         mergeMap((action) => 
            this.qrcodeService.getQRData(action.qrId).pipe(
               tap((response) => {
                  console.log('QR GET Response', response);
               }),
               switchMap((response: QRCodeDocument) => [
                  response
                  ? setQRCodeDocument({ qrCodeDocument: response })
                  : setError({ error: { 
                     header: 'Invalid QR Code', 
                     message: 'The QR code scanned doesnt match the expected format'
                  }})
               ]),
               catchError((error, caught) => {
                  this.store.dispatch(setError({ error }))
                  return EMPTY
               })
            )
         )
      )
   );

   uploadQrCodeDocument$ = createEffect(() => 
      this.actions$.pipe(
         ofType(uploadQrCodeDocument),
         withLatestFrom(this.qrId$, this.scannedDocuments$, this.qrCodeDocument$),
         mergeMap(([, qrId, scannedDocuments, qrCodeDocument]) => 
            this.qrcodeService.updateQRData(
               { 
                  ...qrCodeDocument,
                  scannedDocuments
               } as QRCodeDocument, 
               qrId
            )
            .pipe(
               // tap((response) => console.log('Updating QrCodeDocument', response)),
               switchMap((response: { name: string }) => [
                  changeIsUpdated({ isUpdated: true })
               ]),
               catchError((error, caught) => {
                  this.store.dispatch(setError({ error }))
                  return EMPTY
               })
            )            
         )
      )
   )

}