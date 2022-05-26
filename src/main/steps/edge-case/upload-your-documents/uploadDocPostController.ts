import { Logger } from '@hmcts/nodejs-logging';
import autobind from 'autobind-decorator';
import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import config from 'config';
import { Response } from 'express';
import FormData from 'form-data';

import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { RpeApi } from '../../../app/rpe/RpeApi';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';
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

      /**
       * 
       * @param req 
       * @returns 
       */
      static ResourceReaderContents = (req: AppRequest<AnyObject>): any => {
        let SystemContent= [];
        let SystemLangauge = req.session['lang'];
        const resourceLoader = new ResourceReader();
        resourceLoader.Loader('upload-your-documents')
      let ErrorInLangauges = resourceLoader.getFileContents().errors;


        switch(SystemLangauge){
          case "en":
            SystemContent = ErrorInLangauges.en;
          break;

          case "cy":
            SystemContent = ErrorInLangauges.cy;
          break;

          default: SystemContent =  ErrorInLangauges.en;
        }

        return SystemContent;
      };
  
  /**
   * 
   * @param fileSize 
   * @returns 
   */
  static sizeValidation = (fileSize: number): boolean => {
    const KbsInMBS = 2000000;
    if (fileSize < KbsInMBS) {
      return true;
    } else {
      return false;
    }
  };
  /**
   * 
   * @param mimeType 
   * @returns 
   */
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
    let CaseDocument: any[] = [];
    if(req.session.hasOwnProperty('caseDocuments')){
      CaseDocument = req.session.caseDocuments.map(document=> {
        return{
          "document_binary_url":document._links.binary.href,
          "document_filename":  document.originalDocumentName ,
          "document_url":  document._links.self.href,
        }
      })
    }

    console.log(CaseDocument)
    res.redirect(PAY_YOUR_FEE);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const UploadDocumentInstance = (BASEURL: string, header: AxiosRequestHeaders): AxiosInstance => {
      return axios.create({
        baseURL: BASEURL,
        headers: header,
      });
    };

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

          console.log(req.session)

          console.log(req.session.caseDocuments.map(i => i._links))
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
          const FormattedError: any[] = [];
          if (!validateMimeType) {
            FormattedError.push({
              text: FileValidations.ResourceReaderContents(req).FORMAT_ERROR,
              href: '#',
            });
          }
          if (!validateFileSize) {
            FormattedError.push({
              text: FileValidations.ResourceReaderContents(req).SIZE_ERROR,
              href: '#',
            });
          }

          req.session.fileErrors.push(...FormattedError);

          this.redirect(req, res, UPLOAD_YOUR_DOCUMENTS);
        }
      }
    }
  }
}
