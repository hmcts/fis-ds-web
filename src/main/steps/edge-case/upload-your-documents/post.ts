import axios, { Axios, AxiosInstance, AxiosRequestHeaders } from 'axios';
import { Response } from 'express';
import { AppRequest } from '../../../app/controller/AppRequest';

import {
DOCUMENT_UPLOAD_URL,
} from '../../urls';

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



export class UploadDocumentPOSTController {
  public async post(req: AppRequest, res: Response): Promise<void> {
    //@ts-ignore
    const {ListedDocuments} = req.files;
    const ifMultpleDocuments = Array.isArray(ListedDocuments);
    const FileStorageEndpoint = `/heuwhi`;

    const UplaodDocumentInstance  = (BASEURL: string , header: AxiosRequestHeaders) : AxiosInstance => {
        return axios.create( {
            baseURL: BASEURL,
            headers: header
        });
    }


    if(ifMultpleDocuments){
        for (const file of ListedDocuments) {
            const fileMimeType = file.mimetype;
            const fileSize = file.size;

            const validateMimeType = FileValidations.formatValidation(fileMimeType);
            const validateFileSize = FileValidations.sizeValidation(fileSize);
            
            if (validateMimeType && validateFileSize) {
                const formData = new FormData();
                //@ts-ignore
                formData.append('data', file.data, {
                  contentType: file.mimetype,
                  filename: file.name,
                });
                formData.append('description', file.name);
                formData.append('audience', 'supplier');
                //@ts-ignore
                const formHeaders = formData.getHeaders();

                
                try {
                    //@ts-ignore
                    await UplaodDocumentInstance().post(FileStorageEndpoint, formData, { headers: {...formHeaders}})
                } catch (error) {
                    console.log({msg: 'file has thrown error'})
                }
              
            }
        }
    
        
    }
    else{
        const formData = new FormData();
        //@ts-ignore
        formData.append('data', ListedDocuments.data, {
          contentType: ListedDocuments.mimetype,
          filename: ListedDocuments.name,
        });
        formData.append('description', ListedDocuments.name);
        formData.append('audience', 'supplier');
        //@ts-ignore
        const formHeaders = formData.getHeaders();

        
        try {
            //@ts-ignore
            await UplaodDocumentInstance().post(FileStorageEndpoint, formData, { headers: {...formHeaders}})
        } catch (error) {
            console.log({msg: 'file has thrown error'})
        }
    }
    const isFirstQuestionComplete = true;
    res.redirect(uploadDocumentRedirectPageSwitch(isFirstQuestionComplete));

  }
}

const uploadDocumentRedirectPageSwitch = (isFirstQuestionComplete: boolean) => {
  return isFirstQuestionComplete ? DOCUMENT_UPLOAD_URL : DOCUMENT_UPLOAD_URL;
};



