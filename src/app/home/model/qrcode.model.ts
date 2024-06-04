export interface QRCodeDocument {
   qrId: string;
   details?: string;
   description?: string;
   scannedDocuments?: ScannedDocument[]
}

export interface ScannedDocument {
   docId: string;
   docType: 'IMAGE' | 'PDF';
   docContent?: string;
}