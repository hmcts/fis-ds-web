import autobind from 'autobind-decorator';
import { Response } from 'express';

import { YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { DATE_OF_BIRTH, FULL_NAME } from '../../urls';

@autobind
export default class UserRolePostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);

    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    if (YesOrNo.YES === req.body.applyingForSelf) {
      this.redirect(req, res, req.session.errors?.length ? req.url : DATE_OF_BIRTH);
    } else {
      this.redirect(req, res, req.session.errors?.length ? req.url : FULL_NAME);
    }
  }
}
