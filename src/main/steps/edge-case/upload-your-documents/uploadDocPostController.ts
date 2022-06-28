import { Logger } from '@hmcts/nodejs-logging';
import autobind from 'autobind-decorator';
import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import config from 'config';
import { Response } from 'express';
import FormData from 'form-data';

import { mapCaseData } from '../../../app/case/CaseApi';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';
import { FIS_COS_API_BASE_URL } from '../../../steps/common/constants/apiConstants';
const logger = Logger.getLogger('uploadDocumentPostController');
import { ADDITIONAL_DOCUMENTS_UPLOAD, UPLOAD_YOUR_DOCUMENTS } from '../../urls';

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
};

export const FileUploadBaseURL: URL_OF_FILE = config.get(FIS_COS_API_BASE_URL);

export const AttachFileToCaseBaseURL: URL_OF_FILE = config.get('services.documentManagement.url');
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
    resourceLoader.Loader('upload-your-documents');
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
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  async PostDocumentUploader(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    if (req.session.hasOwnProperty('caseDocuments')) {
      const CaseId = req.session.userCase['id'];
      const baseURL = `/case/dss-orchestration/${CaseId}/update?event=UPDATE`;
      const Headers = {
        Authorization: `Bearer ${req.session.user['accessToken']}`,
      };
      try {
        const MappedRequestCaseDocuments = req.session['caseDocuments'].map(document => {
          const { url, fileName, documentId, binaryUrl } = document;
          return {
            id: documentId,
            value: {
              documentLink: {
                document_url: url,
                document_filename: fileName,
                document_binary_url: binaryUrl,
              },
            },
          };
        });
        const CaseData = mapCaseData(req);
        const responseBody = { ...CaseData, applicantApplicationFormDocuments: MappedRequestCaseDocuments };
        res.json(responseBody);
        const requestData = await this.UploadDocumentInstance(AttachFileToCaseBaseURL, Headers).put(
          baseURL,
          responseBody
        );

        res.json(requestData);
        // res.redirect(ADDITIONAL_DOCUMENTS_UPLOAD);
      } catch (error) {
        res.json({ error, responseBody: req.session.userCase });
        console.log(error);
      }
    }

    res.redirect(ADDITIONAL_DOCUMENTS_UPLOAD);
  }

  public UploadDocumentInstance = (BASEURL: string, header: AxiosRequestHeaders): AxiosInstance => {
    return axios.create({
      baseURL: BASEURL,
      headers: header,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
  };

  /**
   *
   * @param req
   * @param res
   */
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { documentUploadProceed } = req.body;

    console.log({ userDetais: req.session.user });

    let TotalUploadDocuments = 0;
    if (!req.session.hasOwnProperty('caseDocuments')) {
      req.session['caseDocuments'] = [];
      TotalUploadDocuments = 0;
    } else {
      TotalUploadDocuments = req.session['caseDocuments'].length;
    }

    if (documentUploadProceed) {
      /**
       * @PostDocumentUploader
       */
      this.PostDocumentUploader(req, res);
    } else {
      if (TotalUploadDocuments < Number(config.get('documentUpload.validation.totaldocuments'))) {
        if (!req.session.hasOwnProperty('errors')) {
          req.session['errors'] = [];
        }

        const { files }: AppRequest<AnyObject> = req;
        const { documents }: any = files;

        const checkIfMultipleFiles: boolean = Array.isArray(documents);

        // making sure single file is uploaded
        if (!checkIfMultipleFiles) {
          console.log({ mimetype: documents.mimetype });
          const validateMimeType: boolean = FileValidations.formatValidation(documents.mimetype);
          const validateFileSize: boolean = FileValidations.sizeValidation(documents.size);
          const formData: FormData = new FormData();
          if (validateMimeType && validateFileSize) {
            formData.append('file', documents.data, {
              contentType: documents.mimetype,
              filename: documents.name,
            });
            const formHeaders = formData.getHeaders();
            /**
             * @RequestHeaders
             */
            const Headers = {
              Authorization: `Bearer ${req.session.user['accessToken']}`,
            };
            try {
              const RequestDocument = await this.UploadDocumentInstance(FileUploadBaseURL, Headers).post(
                '/doc/dss-orhestration/upload',
                formData,
                {
                  headers: {
                    ...formHeaders,
                  },
                }
              );

              const uploadedDocument = RequestDocument.data.document;
              req.session['caseDocuments'].push(uploadedDocument);
              req.session['errors'] = undefined;
              this.redirect(req, res, UPLOAD_YOUR_DOCUMENTS);
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

            this.redirect(req, res, UPLOAD_YOUR_DOCUMENTS);
          }
        }
      } else {
        req.session.fileErrors.push({
          text: FileValidations.ResourceReaderContents(req).TOTAL_FILES_EXCEED_ERROR,
          href: '#',
        });

        this.redirect(req, res, UPLOAD_YOUR_DOCUMENTS);
      }
    }
  }
}
