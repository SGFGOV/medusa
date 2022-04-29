declare module "sgf-gstin-validator"
 {
    export  function isValidGSTNumber(gstin: string): boolean;
    export  function getGSTINInfo(gstin: string): string;
    export  function validateEInvoiceSignedQR(qrText: string, publickey: string): string | jwt.JwtPayload;
    export  function validateSignedInvoice(signedInvoiceJWT: string, publickey: string): string | jwt.JwtPayload;
    export  function ValidateGSTIN(gstin: string): "Enter a valid 15 character GSTIN" | "Invalid GSTIN format" | "Invalid checksum character in GSTIN" | "Valid GSTIN";
}

