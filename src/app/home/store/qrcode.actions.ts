import { createAction, props } from '@ngrx/store';
import { QRCodeDocument, ScannedDocument } from '../model/qrcode.model';

const actionName = '[QR CODE READER]';

export const setPlatform =  createAction(`${actionName} Set platform`,
   props<{platform: string}>()
);

export const updateQRId =  createAction(`${actionName} Update QR ID`,
   props<{qrId: string}>()
);

export const setQRCodeDocument =  createAction(`${actionName} Set QR code document`,
   props<{qrCodeDocument: QRCodeDocument}>()
);

export const scanNewDocument =  createAction(`${actionName} Scan Document`,
   props<{docType: 'IMAGE' | 'PDF'}>()
);

export const saveDocument =  createAction(`${actionName} Save Document`,
   props<{docContent: string}>()
);

export const setCurrentDocument =  createAction(`${actionName} Set current Document`,
   props<{currentDocument: ScannedDocument}>()
);

export const addCurrentDocument =  createAction(`${actionName} Add current Document`);

export const uploadQrCodeDocument =  createAction(`${actionName} Upload QR code Document`);

export const setError =  createAction(`${actionName} Set error`,
   props<{error: any}>()
);
