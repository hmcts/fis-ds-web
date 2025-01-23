import config from 'config';
import { Response } from 'express';
import FormData from 'form-data';
import _ from 'lodash';

import { getCaseApi } from '../../../app/case/CaseApi';
import { UploadDocumentContext } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject } from '../../../app/controller/PostController';
import { FormError } from '../../../app/form/Form';
import { parseUrl } from '../../../steps/common/url-parser';
import { ADDITIONAL_DOCUMENTS_UPLOAD, UPLOAD_YOUR_DOCUMENTS } from '../../../steps/urls';

const fileMimeType: Partial<Record<string, string>> = {
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

const sizeValidation = (fileSize: number): boolean => {
  return fileSize <= Number(config.get('documentUpload.validation.sizeInKB'));
};

const formatValidation = (mimeType: string): boolean => {
  return Object.values(fileMimeType).filter(aMimeType => aMimeType === mimeType).length > 0;
};

const getPropertyName = (context: UploadDocumentContext): string => {
  return context === UploadDocumentContext.UPLOAD_ADDITIONAL_DOCUMENTS
    ? 'additionalApplicationUpload'
    : 'applicationUpload';
};

const getDocumentType = (context: UploadDocumentContext): string => {
  return context === UploadDocumentContext.UPLOAD_ADDITIONAL_DOCUMENTS
    ? 'applicantAdditionalDocuments'
    : 'applicantApplicationFormDocuments';
};

export const handleDocumentUpload = async (
  req: AppRequest,
  res: Response,
  uploadedDocumentCount: number,
  context: UploadDocumentContext
): Promise<void> => {
  const { files }: AppRequest<AnyObject> = req;
  const redirectUrl =
    context === UploadDocumentContext.UPLOAD_ADDITIONAL_DOCUMENTS
      ? parseUrl(ADDITIONAL_DOCUMENTS_UPLOAD).url
      : parseUrl(UPLOAD_YOUR_DOCUMENTS).url;
  req.session.errors = [];
  const uploadPropertyName = getPropertyName(context);

  if (!req.session.hasOwnProperty('errors')) {
    req.session['errors'] = [];
  }

  if (_.isNull(files)) {
    req.session.errors.push({
      errorType: 'noFileUploadError',
      propertyName: uploadPropertyName,
    });
    req.session.save(() => res.redirect(redirectUrl));
  } else {
    if (
      uploadedDocumentCount <
      Number(
        config.get(
          context === UploadDocumentContext.UPLOAD_ADDITIONAL_DOCUMENTS
            ? 'documentUpload.validation.totalAdditionalDocuments'
            : 'documentUpload.validation.totaldocuments'
        )
      )
    ) {
      const documents: any = files?.[uploadPropertyName];
      if (!_.isArray(documents)) {
        const validateMimeType: boolean = formatValidation(documents.mimetype);
        const validateFileSize: boolean = sizeValidation(documents.size);
        const formData: FormData = new FormData();

        if (validateMimeType && validateFileSize) {
          formData.append('file', documents.data, {
            contentType: documents.mimetype,
            filename: documents.name,
          });

          try {
            const requestDocument = await getCaseApi(req.session.user, req.locals.logger).uploadDocument(formData);
            req.session.userCase[getDocumentType(context)].push(requestDocument.document);
            req.session['errors'] = [];
            req.session.save(() => res.redirect(redirectUrl));
          } catch (error) {
            req.session.errors.push({
              errorType: 'uploadError',
              propertyName: uploadPropertyName,
            });
            req.locals.logger.error(error);
            req.session.save(() => res.redirect(redirectUrl));
          }
        } else {
          const formattedError: FormError[] = [];
          if (!validateFileSize) {
            formattedError.push({
              errorType: 'sizeError',
              propertyName: uploadPropertyName,
            });
          }

          if (!validateMimeType) {
            formattedError.push({
              errorType: 'formatError',
              propertyName: uploadPropertyName,
            });
          }

          req.session.errors.push(...formattedError);
          req.session.save(() => res.redirect(redirectUrl));
        }
      }
    } else {
      req.session.errors.push({
        errorType: 'totalFilesExceededError',
        propertyName: uploadPropertyName,
      });

      req.session.save(() => res.redirect(redirectUrl));
    }
  }
};

export const deleteDocument = async (
  req: AppRequest,
  res: Response,
  removeId: string,
  context: UploadDocumentContext
): Promise<void> => {
  const documentType = getDocumentType(context);
  let documentToDelete;
  req.session.errors = [];

  if (req.session.userCase[documentType]) {
    documentToDelete = req.session.userCase[documentType].find(
      document => document.document_url.split('/')[document.document_url.split('/').length - 1] === removeId
    );
  }

  if (documentToDelete) {
    try {
      await getCaseApi(req?.session?.user, req.locals.logger).deleteDocument(removeId.toString());
      req.session.userCase[documentType] = req.session.userCase?.[documentType]?.filter(
        document => document.document_url.split('/')[document.document_url.split('/').length - 1] !== removeId
      );
    } catch (error) {
      req.session.errors.push({
        errorType: 'deleteError',
        propertyName: getPropertyName(context),
      });
    } finally {
      const redirectUrl =
        context === UploadDocumentContext.UPLOAD_ADDITIONAL_DOCUMENTS
          ? parseUrl(ADDITIONAL_DOCUMENTS_UPLOAD).url
          : parseUrl(UPLOAD_YOUR_DOCUMENTS).url;
      req.session.save(() => {
        res.redirect(redirectUrl);
      });
    }
  }
};
