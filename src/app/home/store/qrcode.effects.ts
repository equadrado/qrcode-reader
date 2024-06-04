import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, mergeMap, of, switchMap, tap, withLatestFrom } from "rxjs";

import { QrcodeService } from "../services/qrcode.service";
import * as QrcodeReaderStore from './qrcode.reducer';
import { setError, setPlatform, updateQRId, setQRCodeDocument, uploadQrCodeDocument } from "./qrcode.actions";
import { selectCurrentDocument, selectQrCodeDocument, selectQrId, selectScannedDocuments } from "./qrcode.selectors";
import { QRCodeDocument } from "../model/qrcode.model";

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

   updateQRId$ = createEffect(() => 
      this.actions$.pipe(
         ofType(updateQRId),
         mergeMap((action) => 
            this.qrcodeService.getQRData(action.qrId).pipe(
               tap((response) => console.log(`Loaded QRCodeDocument ${response.qrId}`)),
               switchMap((response: QRCodeDocument) => [
                  setQRCodeDocument({ qrCodeDocument: response })
               ]),
               catchError((err) => of(setError({ error: err })))
            )
      ))
   );

   uploadQrCodeDocument$ = createEffect(() => 
      this.actions$.pipe(
         ofType(uploadQrCodeDocument),
         withLatestFrom(this.qrId$, this.scannedDocuments$, this.qrCodeDocument$),
         mergeMap(([, qrId, scannedDocuments, qrCodeDocument]) => 
            this.qrcodeService.updateQRData({ 
                  ...qrCodeDocument,
                  scannedDocuments
               } as QRCodeDocument, qrId).pipe(
               tap((response) => console.log(response)),
               switchMap((response: { name: string }) => [
                  // add document data to list,
               ]),
               catchError((err) => of(setError({ error: err })))
            )
         )
      )
   )

   // updateQRId$ = createEffect(() => 
   //    this.actions$.pipe(
   //       ofType(updateQRId),
   //       withLatestFrom(this.qrId$),
   //       switchMap(([, qrId]) => [
   //          updateQRdata({ qrdata: this.qrcodeService.generateQRCodeData(qrId) })
   //       ])
   //    )
   // )

}