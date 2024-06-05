import { Action, createReducer, on } from "@ngrx/store";
import * as QRCodeReaderActions from './qrcode.actions';
import { QRCodeDocument, ScannedDocument } from "../model/qrcode.model";

export const qrcodeReaderKey = 'qrcodeReaderFeature';

export interface State {
   platform: string;
   qrCodeDocument: QRCodeDocument | undefined;
   qrId: string;
   scannedDocuments: ScannedDocument[];
   currentDocument: ScannedDocument | undefined;
   error: { header: string, message: string } | any;
}

export const initialState: State = {
   platform: 'none',
   qrCodeDocument: undefined,
   qrId: '',
   scannedDocuments: [],
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
      qrId,
      qrCodeDocument: undefined,
      currentDocument: undefined,
      scannedDocuments: []
   })),
   on(QRCodeReaderActions.setCurrentDocument, (state, { currentDocument }) => ({
      ...state,
      currentDocument
   })),
   on(QRCodeReaderActions.addCurrentDocument, (state) => ({
      ...state,
      scannedDocuments: [...state.scannedDocuments, state.currentDocument!]
   })),
   on(QRCodeReaderActions.deleteScannedDocument, (state, { docId }) => ({
      ...state,
      scannedDocuments: [...state.scannedDocuments.filter((document) => document.docId != docId )]
   })),
   on(QRCodeReaderActions.setQRCodeDocument, (state, { qrCodeDocument }) => ({
      ...state,
      qrCodeDocument,
      scannedDocuments: qrCodeDocument.scannedDocuments ?? []
   }))
)

export const reducer = (state: State | undefined, action: Action) => qrcodeReaderReducer(state, action);