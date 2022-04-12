
import { Application } from 'express';
import fileUpload from 'express-fileupload'


/**
 * @FileUpload
 * sets up the fileUpload
 */
export class FileUpload {
  public enableFor(app: Application): void {

    app.use(fileUpload({
        limits: { fileSize: 100 * 1024 * 1024 },
      }));

  }}

