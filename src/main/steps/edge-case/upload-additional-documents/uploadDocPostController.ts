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
import { ADDITIONAL_DOCUMENTS_UPLOAD, PAY_YOUR_FEE } from '../../urls';

/**
 * ****** File Extensions Types are being check
 */
type URL_OF_FILE = string;

/**
 * ****** File Extensions Types are being check
 */
type FileType = {
  doc: string;
  docx: string;
  pdf: string;
  png: string;
  xls: string;
  xlsx: string;
  jpg: string;
  txt: string;
  rtf: string;
  gif: string;
};

/**
 * ****** File MimeTypes are being check
 */
type FileMimeTypeInfo = {
  'application/msword': string;
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': string;
  'application/pdf': string;
  'image/png': string;
  'application/vnd.ms-excel': string;
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': string;
  'image/jpeg': string;
  'text/plain': string;
  'application/rtf': string;
  'image/gif': string;
};

/**
 * ****** File Upload validations Message
 */
type FileUploadErrorTranslatables = {
  FORMAT_ERROR?: string;
  SIZE_ERROR?: string;
  TOTAL_FILES_EXCEED_ERROR?: string;
};

export const FileUploadBaseURL: URL_OF_FILE = config.get('services.documentManagement.url');

/**
 * @FileHandler
 */
export const FileMimeType: Partial<Record<keyof FileType, keyof FileMimeTypeInfo>> = {
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

  static ResourceReaderContents = (req: AppRequest<AnyObject>): FileUploadErrorTranslatables => {
    let SystemContent: any | FileUploadErrorTranslatables = {};
    const SystemLangauge = req.session['lang'];
    const resourceLoader = new ResourceReader();
    resourceLoader.Loader('upload-addtional-documents');
    const ErrorInLangauges = resourceLoader.getFileContents().errors;
    switch (SystemLangauge) {
      case 'en':
        SystemContent = ErrorInLangauges.en;
        break;
      case 'cy':
        SystemContent = ErrorInLangauges.cy;
        break;
      default:
        SystemContent = ErrorInLangauges.en;
    }
    return SystemContent;
  };

  /**
   *
   * @param fileSize
   * @returns
   */
  static sizeValidation = (fileSize: number): boolean => {
    const KbsInMBS = Number(config.get('documentUpload.validation.sizeInKB'));
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
    const checkForFileMimeType = allMimeTypes.filter(aMimeType => aMimeType === mimeType);
    return checkForFileMimeType.length > 0;
  };
}

@autobind
export default class UploadDocumentController extends PostController<AnyObject> {
  constructor(protected fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  async PostDocumentUploader(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    let AddtionalCaseDocuments: any[] = [];
    if (req.session.hasOwnProperty('AddtionalCaseDocuments')) {
      AddtionalCaseDocuments = req.session.AddtionalCaseDocuments.map(document => {
        return {
          document_binary_url: document._links.binary.href,
          document_filename: document.originalDocumentName,
          document_url: document._links.self.href,
        };
      });
    }
    console.log(AddtionalCaseDocuments);
    res.redirect(PAY_YOUR_FEE);
  }

  public UploadDocumentInstance = (BASEURL: string, header: AxiosRequestHeaders): AxiosInstance => {
    return axios.create({
      baseURL: BASEURL,
      headers: header,
    });
  };

  /**
   *
   * @param req
   * @param res
   */
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    console.log(req.files);

    const { documentUploadProceed } = req.body;

    let TotalUploadDocuments = 0;
    if (!req.session.hasOwnProperty('AddtionalCaseDocuments')) {
      req.session['AddtionalCaseDocuments'] = [];
      TotalUploadDocuments = 0;
    } else {
      TotalUploadDocuments = req.session['AddtionalCaseDocuments'].length;
    }

    if (documentUploadProceed) {
      /**
       * @PostDocumentUploader
       */
      this.PostDocumentUploader(req, res);
    } else {
      if (TotalUploadDocuments < Number(config.get('documentUpload.validation.totalAdditionalDocuments'))) {
        if ((await RpeApi.getRpeToken()).response) {
          req.session.rpeToken = (await RpeApi.getRpeToken()).data;
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
              const RequestDocument = await this.UploadDocumentInstance(FileUploadBaseURL, Headers).post(
                '/cases/documents',
                formData,
                {
                  headers: {
                    ...formHeaders,
                  },
                }
              );
              console.log(RequestDocument.data.documents[0]);

              const { originalDocumentName, _links } = RequestDocument.data.documents[0];

              req.session['AddtionalCaseDocuments'].push({ originalDocumentName, _links });
              req.session['errors'] = undefined;
              this.redirect(req, res, ADDITIONAL_DOCUMENTS_UPLOAD);
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

            this.redirect(req, res, ADDITIONAL_DOCUMENTS_UPLOAD);
          }
        }
      } else {
        req.session.fileErrors.push({
          text: FileValidations.ResourceReaderContents(req).TOTAL_FILES_EXCEED_ERROR,
          href: '#',
        });

        this.redirect(req, res, ADDITIONAL_DOCUMENTS_UPLOAD);
      }
    }
  }
}
