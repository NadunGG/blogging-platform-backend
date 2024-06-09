export interface UploadFile {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
  fieldname?: string;
  encoding?: string;
  size?: number;
  stream?: NodeJS.ReadableStream;
}
