import { Action, createReducer, on } from "@ngrx/store";
import * as QRCodeReaderActions from './qrcode.actions';
import { ScannedDocument } from "../model/qrcode.model";

export const qrcodeReaderKey = 'qrcodeReaderFeature';

export interface State {
   platform: string;
   qrdata: string;
   qrId: string;
   documents: ScannedDocument[];
   currentDocument: ScannedDocument | undefined;
   error: any;
}

export const initialState: State = {
   platform: 'none',
   qrdata: '',
   qrId: '',
   documents: [],
   currentDocument: undefined,
   error: null
}

const qrcodeReaderReducer = createReducer(
   initialState,
   on(QRCodeReaderActions.setPlatform, (state, { platform }) => ({
      ...state,
      platform
   })),
   on(QRCodeReaderActions.updateQRId, (state, { qrId }) => ({
      ...state,
      qrId
   })),
   on(QRCodeReaderActions.scanNewDocument, (state, { docType }) => ({
      ...state,
      currentDocument: {
         docId: Math.random().toString(),
         docType
      } as ScannedDocument
   })),
   on(QRCodeReaderActions.saveDocument, (state, { docContent }) => ({
      ...state,
      currentDocument: {
         ...state.currentDocument,
         docContent
      } as ScannedDocument
   }))
)

export const reducer = (state: State | undefined, action: Action) => qrcodeReaderReducer(state, action);