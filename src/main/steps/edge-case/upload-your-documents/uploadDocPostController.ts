import { Logger } from '@hmcts/nodejs-logging';
import autobind from 'autobind-decorator';
import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import config from 'config';
import { Response } from 'express';
import FormData from 'form-data';
import {ResourceReader} from '../../../modules/resourcereader/ResourceReader'
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { RpeApi } from '../../../app/rpe/RpeApi';
const logger = Logger.getLogger('uploadDocumentPostController');
import { PAY_YOUR_FEE, UPLOAD_YOUR_DOCUMENTS } from '../../urls';

/**
 * @FileHandler
 */
export const FileMimeType = {
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  pdf: 'application/pdf',
  png: 'image/png',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  jpg: 'image/jpeg',
  txt: 'text/plain',
  rtf: 'application/rtf',
  gif: 'image/gif',
};

export class FileValidations {


  static ResourceReaderContents = () : Object => {
    let  resourceLoader = new ResourceReader();
    resourceLoader.Loader('upload-your-documents');
    return resourceLoader.getFileContents().errors;
  }

  static sizeValidation = (fileSize: number): boolean => {
    const KbsInMBS = 2000000;
    if (fileSize < KbsInMBS) {
      return true;
    } else {
      return false;
    }
  };
  static formatValidation = (mimeType: string): boolean => {
    const allMimeTypes = Object.values(FileMimeType);
    const checkForFileMimeType = allMimeTypes.filter(aMimeType => aMimeType === mimeType).length > 0;
    return checkForFileMimeType;
  };
}


export const FileUploadBaseURL: string = config.get('services.documentManagement.url');

@autobind
export default class UploadDocumentController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  async PostDocumentUploader(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    logger.log({ message: 'document has been successfully procceed and attached to the case' });
    res.redirect(PAY_YOUR_FEE);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const UploadDocumentInstance = (BASEURL: string, header: AxiosRequestHeaders): AxiosInstance => {
      return axios.create({
        baseURL: BASEURL,
        headers: header,
      });
    };

    const CurrentNumberOfDocuments = req.session.caseDocuments.length;

    if(CurrentNumberOfDocuments < 5){
      
    const { documentUploadProceed } = req.body;

    if (documentUploadProceed) {
      /**
       * @PostDocumentUploader
       */
      this.PostDocumentUploader(req, res);
    } else {
      if ((await RpeApi.getRpeToken()).response) {
        req.session.rpeToken = (await RpeApi.getRpeToken()).data;
      }

      if (!req.session.hasOwnProperty('caseDocuments')) {
        req.session['caseDocuments'] = [];
      }

      if (!req.session.hasOwnProperty('errors')) {
        req.session['errors'] = [];
      }

      const { files }: AppRequest<AnyObject> = req;
      const { documents }: any = files;

    

      const checkIfMultipleFiles: boolean = Array.isArray(documents);

      // making sure single file is uploaded
      if (!checkIfMultipleFiles) {
        const validateMimeType: boolean = FileValidations.formatValidation(documents.mimetype);
        const validateFileSize: boolean = FileValidations.sizeValidation(documents.size);
        const formData: FormData = new FormData();
        if (validateMimeType && validateFileSize) {
          formData.append('files', documents.data, {
            contentType: documents.mimetype,
            filename: documents.name,
          });
          formData.append('caseTypeId', 'PRLAPPS');
          formData.append('jurisdictionId', 'PRIVATELAW');
          formData.append('classification', 'RESTRICTED');

          const formHeaders = formData.getHeaders();
          /**
           * @RequestHeaders
           */
          const Headers = {
            Authorization: `Bearer ${req.session.user['accessToken']}`,
            ServiceAuthorization: req.session['rpeToken'],
          };
          try {
            const RequestDocument = await UploadDocumentInstance(FileUploadBaseURL, Headers).post(
              '/cases/documents',
              formData,
              {
                headers: {
                  ...formHeaders,
                },
              }
            );

            const { originalDocumentName, _links } = RequestDocument.data.documents[0];
            req.session['caseDocuments'].push({ originalDocumentName, _links });
            req.session['errors'] = undefined;
            this.redirect(req, res, UPLOAD_YOUR_DOCUMENTS);
          } catch (error) {
            logger.error(error);
            res.json({ msg: 'error occured', error });
          }
        } else {

          let FormattedError: Object[] = [];
          if(!validateMimeType){
              FormattedError.push({
                "text": "",
                "href": "#"
              })
            
          }
          if(!validateFileSize){
            FormattedError.push({
              "text": "File size exceeds 20Mb. Please upload a file that is less than 20Mb",
              "href": "#"
            })
          }

          req.session.fileErrors.push(...FormattedError);

          this.redirect(req, res, UPLOAD_YOUR_DOCUMENTS);
        }
      }
    }
  }
      else{
        /**
         * For more than 5 documents
         */

        req.session.fileErrors.push({
          "text": "You can upload 5 files only. Please delete one of the uploaded files and retry",
          "href": "#"
        });
        this.redirect(req, res, UPLOAD_YOUR_DOCUMENTS);
  }
  }
  
}
