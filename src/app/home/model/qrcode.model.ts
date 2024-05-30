export interface QRCode {
   qrId: string;
   scannedDocuments: ScannedDocument[]
}

export interface ScannedDocument {
   docId: string;
   docType: 'IMAGE' | 'PDF';
   docContent?: string;
}