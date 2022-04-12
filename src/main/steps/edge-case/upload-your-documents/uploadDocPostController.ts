//@ts-ignore

import autobind from 'autobind-decorator';
import { Response } from 'express';
import {AnyObject, PostController} from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { AppRequest } from '../../../app/controller/AppRequest';
import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
//import FormData from 'form-data';

const FileMimeType = {
  "csv": "text/csv",
  "doc": "application/msword",
  "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "jpg": "image/jpeg",
  "kml": "application/vnd.google-earth.kml+xml",
  "ods": "application/vnd.oasis.opendocument.spreadsheet",
  "odt": "application/vnd.oasis.opendocument.text",
  "pdf": "application/pdf",
  "png": "image/png",
  "ppt": "application/vnd.ms-powerpoint",
  "pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "rdf": "application/rdf+xml", 
  "rtf": "application/rtf",
  "txt": "text/plain",
  "xls": "application/vnd.ms-excel",
  "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 
  "xml": "text/xml", 
  "zip": "application/x-zip-compressed"
} 
//@ts-ignore
class FileValidations{

  static sizeValidation = (fileSize: number) => {
  const KbsInMBS = 300000;
  if(fileSize < KbsInMBS) return true;
  else return false;
  }
  static formatValidation = (mimeType : string ) => {
          const allMimeTypes = Object.values(FileMimeType);
          const checkForFileMimeType = allMimeTypes.filter(aMimeType => aMimeType === mimeType).length > 0;
         return checkForFileMimeType;
  }
}




@autobind
export default class UploadDocumentController  extends PostController<AnyObject> {
    constructor(protected readonly fields: FormFields | FormFieldsFn) {
      super(fields);
    }

    public static FileUploadBaseURL = '';


    public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
        //@ts-ignore
      const UplaodDocumentInstance  = (BASEURL: string , header: AxiosRequestHeaders) : AxiosInstance => {
        return axios.create( {
            baseURL: BASEURL,
            headers: header
        });
    }


      const {files} = req;

      console.log(files)

      /**
       * 
       *  const checkIfMultipleFiles = Array.isArray(files);
    
      if(checkIfMultipleFiles){
        for (const file of files) {
            const fileMimeType = file.mimetype;
            const fileSize = file.size;

            const validateMimeType = FileValidations.formatValidation(fileMimeType);
            const validateFileSize = FileValidations.sizeValidation(fileSize);

            if (validateMimeType && validateFileSize) {
                const formData = new FormData();
                //@ts-ignore
                formData.append('data', file.data, {
                  contentType: file.mimetype,
                  //@ts-ignore
                  filename: file.name,
                });
                //@ts-ignore
                formData.append('description', file.name);
                formData.append('audience', 'supplier');
                //@ts-ignore
                const formHeaders = formData.getHeaders();


                try {
                  
                    //@ts-ignore
                   // await UplaodDocumentInstance().post(FileStorageEndpoint, formData, { headers: {...formHeaders}})
                } catch (error) {
                    console.log({msg: 'file has thrown error'})
                }

            }
        }


    }
    else{
        const formData = new FormData();
        //@ts-ignore
        formData.append('data', files.data, {
           //@ts-ignore
          contentType: files.mimetype,
           //@ts-ignore
          filename: files.name,
        });
         //@ts-ignore
        formData.append('description', files.name);
        formData.append('audience', 'supplier');
        //@ts-ignore
        const formHeaders = formData.getHeaders();


        try {
            //@ts-ignore
          //  await UplaodDocumentInstance().post(FileStorageEndpoint, formData, { headers: {...formHeaders}})
        } catch (error) {
            console.log({msg: 'file has thrown error'})
        }
    }
       * 
       */
     

    this.redirect(req, res);





    }

}