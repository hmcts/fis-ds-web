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
const logger = Logger.getLogger('uploadDocumentPostController');
import { UPLOAD_YOUR_DOCUMENTS } from '../../urls';

/**
 * @FileHandler
 */
const FileMimeType = {
  csv: 'text/csv',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  jpg: 'image/jpeg',
  kml: 'application/vnd.google-earth.kml+xml',
  ods: 'application/vnd.oasis.opendocument.spreadsheet',
  odt: 'application/vnd.oasis.opendocument.text',
  pdf: 'application/pdf',
  png: 'image/png',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  rdf: 'application/rdf+xml',
  rtf: 'application/rtf',
  txt: 'text/plain',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  xml: 'text/xml',
  zip: 'application/x-zip-compressed',
};

class FileValidations {
  static sizeValidation = (fileSize: number) => {
    const KbsInMBS = 200000;
    if (fileSize < KbsInMBS) {
      return true;
    } else {
      return false;
    }
  };
  static formatValidation = (mimeType: string) => {
    const allMimeTypes = Object.values(FileMimeType);
    const checkForFileMimeType = allMimeTypes.filter(aMimeType => aMimeType === mimeType).length > 0;
    return checkForFileMimeType;
  };
}

const FileUploadBaseURL: string = config.get('services.documentManagement.url');

@autobind
export default class UploadDocumentController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const UploadDocumentInstance = (BASEURL: string, header: AxiosRequestHeaders): AxiosInstance => {
      return axios.create({
        baseURL: BASEURL,
        headers: header,
      });
    };

    if ((await RpeApi.getRpeToken()).response) {
      req.session.rpeToken = (await RpeApi.getRpeToken()).data;
    }

    if (req.session.caseDocuments === undefined) {
      req.session.caseDocuments = [];
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
          this.redirect(req, res, UPLOAD_YOUR_DOCUMENTS);
        } catch (error) {
          logger.error(error);
          res.json({msg: 'error occured'})
        }
      } else {
        res.json({ msg: 'error validating files' });
      }
    }
  }
}
