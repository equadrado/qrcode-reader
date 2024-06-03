export interface QRCodeDocument {
   qrId: string;
   scannedDocuments: ScannedDocument[]
}

export interface ScannedDocument {
   docId: string;
   docType: 'IMAGE' | 'PDF';
   docContent?: string;
}