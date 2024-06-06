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

export interface QRError {
   header: string;
   message: string;
}

export interface AuthResponseData {
   kind: string;
   idToken: string;
   email: string;
   refreshToken: string;
   localId: string;
   expiresIn: string;
   registered?: boolean;
 }