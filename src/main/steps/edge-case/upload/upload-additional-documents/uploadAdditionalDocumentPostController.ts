/* eslint-disable @typescript-eslint/no-unused-vars */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CITIZEN_UPDATE, UploadDocumentContext } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { CHECK_YOUR_ANSWERS } from '../../../urls';
import { handleDocumentUpload } from '../utils';

@autobind
export default class UploadAdditionalDocumentPostController extends PostController<AnyObject> {
  constructor(protected fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { saveAndContinue } = req.body;

    let totalUploadDocuments = 0;
    req.session.errors = [];

    if (!req.session.userCase.hasOwnProperty('applicantAdditionalDocuments')) {
      req.session.userCase.applicantAdditionalDocuments = [];
    } else {
      totalUploadDocuments = req.session.userCase.applicantAdditionalDocuments.length;
    }

    if (saveAndContinue) {
      Object.assign(req.session.userCase, await req.locals.api.updateCase(req.session.userCase, CITIZEN_UPDATE));
      this.redirect(req, res, CHECK_YOUR_ANSWERS);
    } else {
      handleDocumentUpload(req, res, totalUploadDocuments, UploadDocumentContext.UPLOAD_ADDITIONAL_DOCUMENTS);
    }
  }
}
