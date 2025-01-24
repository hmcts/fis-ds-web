/* eslint-disable @typescript-eslint/no-unused-vars */
import autobind from 'autobind-decorator';
import { Response } from 'express';
import _ from 'lodash';

import { CITIZEN_UPDATE, UploadDocumentContext } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { parseUrl } from '../../../../steps/common/url-parser';
import { ADDITIONAL_DOCUMENTS_UPLOAD, UPLOAD_YOUR_DOCUMENTS } from '../../../urls';
import { handleDocumentUpload } from '../utils';

@autobind
export default class UploadDocumentController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { saveAndContinue } = req.body;
    req.session.errors = [];

    if (saveAndContinue) {
      if (req.session.userCase.applicantApplicationFormDocuments.length === 0) {
        req.session.errors.push({
          errorType: 'continueWithoutUploadError',
          propertyName: 'applicationUpload',
        });

        this.redirect(req, res, parseUrl(UPLOAD_YOUR_DOCUMENTS).url);
      } else {
        Object.assign(req.session.userCase, await req.locals.api.updateCase(req.session.userCase, CITIZEN_UPDATE));
        this.redirect(req, res, parseUrl(ADDITIONAL_DOCUMENTS_UPLOAD).url);
      }
    } else {
      handleDocumentUpload(req, res, UploadDocumentContext.UPLOAD_YOUR_DOCUMENTS);
    }
  }
}
