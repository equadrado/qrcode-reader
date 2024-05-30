import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, qrcodeReaderKey } from './qrcode.reducer';

export const getState = createFeatureSelector<State>(qrcodeReaderKey);

export const selectQrId = createSelector(
   getState,
   (state: State) => state.qrId
)

export const selectPlatform = createSelector(
   getState,
   (state: State) => state.platform
)

export const selectCurrentDocument = createSelector(
   getState,
   (state: State) => state.currentDocument
)