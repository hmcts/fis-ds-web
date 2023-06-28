import https from 'https';

import { Logger } from '@hmcts/nodejs-logging';
import autobind from 'autobind-decorator';
import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import config from 'config';
import { Response } from 'express';
import FormData from 'form-data';
import { isNull } from 'lodash';

import { mapCaseData } from '../../../app/case/CaseApi';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';
import { COS_API_BASE_URL } from '../../../steps/common/constants/apiConstants';
const logger = Logger.getLogger('uploadDocumentPostController');
import { ADDITIONAL_DOCUMENTS_UPLOAD, CHECK_YOUR_ANSWERS } from '../../urls';
import { getUploadDocumentInstance } from '../util';

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
  rtf2: string;
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
  'text/rtf': string;
  'image/gif': string;
};
/**
 * ****** File Upload validations Message
 */
type FileUploadErrorTranslatables = {
  FORMAT_ERROR?: string;
  SIZE_ERROR?: string;
  TOTAL_FILES_EXCEED_ERROR?: string;
  NO_FILE_UPLOAD_ERROR?: string;
};

export const COS_API_URL: URL_OF_FILE = config.get(COS_API_BASE_URL);

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
  rtf2: 'text/rtf',
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
    if (fileSize <= KbsInMBS) {
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
    if (req.session.hasOwnProperty('AddtionalCaseDocuments')) {
      const CaseId = req.session.userCase['id'];
      const baseURL = '/' + CaseId + '/citizen-case-update/update-dss-case';
      try {
        const MappedUploadRequestCaseDocuments = req.session['caseDocuments'].map(document => {
          const { document_url, document_filename, document_binary_url } = document;
          return {
            id: document_url.substring(document_url.lastIndexOf('/') + 1),
            value: {
              documentLink: {
                document_url,
                document_filename,
                document_binary_url,
              },
            },
          };
        });

        const MappedRequestCaseDocuments = req.session['AddtionalCaseDocuments'].map(document => {
          const { document_url, document_filename, document_binary_url } = document;
          return {
            id: document_url.substring(document_url.lastIndexOf('/') + 1),
            value: {
              documentLink: {
                document_url,
                document_filename,
                document_binary_url,
              },
            },
          };
        });
        const CaseData = mapCaseData(req);
        const responseBody = {
          ...CaseData,
          applicantAdditionalDocuments: MappedRequestCaseDocuments,
          applicantApplicationFormDocuments: MappedUploadRequestCaseDocuments,
        };

        await getUploadDocumentInstance(req).post(baseURL, responseBody, {
          httpsAgent: new https.Agent({ rejectUnauthorized: false }),
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        });
        res.redirect(CHECK_YOUR_ANSWERS);
      } catch (error) {
        console.log(error);
      }
    }
  }

  public UploadDocumentInstance = (BASEURL: string, header: AxiosRequestHeaders): AxiosInstance => {
    return axios.create({
      baseURL: BASEURL,
      headers: header,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
  };

  private uploadFileError(req: AppRequest<AnyObject>, res: Response<any, Record<string, any>>, errorMessage?: string) {
    req.session.fileErrors.push({
      text: errorMessage,
      href: '#',
    });

    this.redirect(req, res, ADDITIONAL_DOCUMENTS_UPLOAD);
  }

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
      const { files }: AppRequest<AnyObject> = req;

      if (isNull(files)) {
        console.log('no file is selected');
        const errorMessage = FileValidations.ResourceReaderContents(req).NO_FILE_UPLOAD_ERROR;
        this.uploadFileError(req, res, errorMessage);
      } else {
        if (TotalUploadDocuments < Number(config.get('documentUpload.validation.totalAdditionalDocuments'))) {
          if (!req.session.hasOwnProperty('errors')) {
            req.session['errors'] = [];
          }

          const { documents }: any = files;

          const checkIfMultipleFiles: boolean = Array.isArray(documents);

          // making sure single file is uploaded
          if (!checkIfMultipleFiles) {
            const validateMimeType: boolean = FileValidations.formatValidation(documents.mimetype);
            const validateFileSize: boolean = FileValidations.sizeValidation(documents.size);
            const formData: FormData = new FormData();
            if (validateMimeType && validateFileSize) {
              formData.append('file', documents.data, {
                contentType: documents.mimetype,
                filename: documents.name,
              });
              const formHeaders = formData.getHeaders();

              try {
                const RequestDocument = await getUploadDocumentInstance(req).post(
                  '/upload-citizen-document',
                  formData,
                  {
                    headers: {
                      ...formHeaders,
                    },
                    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
                  }
                );

                const uploadedDocument = RequestDocument.data.document;
                req.session['AddtionalCaseDocuments'].push(uploadedDocument);
                req.session['errors'] = undefined;
                this.redirect(req, res, ADDITIONAL_DOCUMENTS_UPLOAD);
              } catch (error) {
                logger.error(error);
              }
            } else {
              const FormattedError: any[] = [];
              if (!validateFileSize) {
                FormattedError.push({
                  text: FileValidations.ResourceReaderContents(req).SIZE_ERROR,
                  href: '#',
                });
              }
              if (!validateMimeType) {
                FormattedError.push({
                  text: FileValidations.ResourceReaderContents(req).FORMAT_ERROR,
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
}
