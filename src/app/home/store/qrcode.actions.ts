import { createAction, props } from '@ngrx/store';

const actionName = '[QR CODE READER]';

export const setPlatform =  createAction(`${actionName} Set platform`,
   props<{platform: string}>()
);

export const updateQRId =  createAction(`${actionName} Update QR ID`,
   props<{qrId: string}>()
);

export const updateQRdata =  createAction(`${actionName} Update QR data`,
   props<{qrdata: string}>()
);

export const scanNewDocument =  createAction(`${actionName} Scan Document`,
   props<{docType: 'IMAGE' | 'PDF'}>()
);

export const saveDocument =  createAction(`${actionName} Save Document`,
   props<{docContent: string}>()
);

export const setError =  createAction(`${actionName} Set error`,
   props<{error: any}>()
);
