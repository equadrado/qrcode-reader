import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, mergeMap, of, switchMap, tap, withLatestFrom } from "rxjs";

import { QrcodeService } from "../services/qrcode.service";
import * as QrcodeReaderStore from './qrcode.reducer';
import { setError, setPlatform, updateQRId, updateQRdata } from "./qrcode.actions";
import { selectQrId } from "./qrcode.selectors";

@Injectable()
export class QRCodeEffects {
   qrId$ = this.store.select(selectQrId);

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

   // createNewId$ = createEffect(() => 
   //    this.actions$.pipe(
   //       ofType(createNewId),
   //       mergeMap(() => 
   //          this.qrcodeService.generateQRCodeId().pipe(
   //             tap((response) => console.log(response)),
   //             switchMap((response: { name: string }) => [
   //                updateQRId({qrId: response.name}),
   //             ]),
   //             catchError((err) => of(setError({ error: err })))
   //          )
   //       )
   //    )
   // )

   updateQRId$ = createEffect(() => 
      this.actions$.pipe(
         ofType(updateQRId),
         withLatestFrom(this.qrId$),
         switchMap(([, qrId]) => [
            updateQRdata({ qrdata: this.qrcodeService.generateQRCodeData(qrId) })
         ])
      )
   )

}