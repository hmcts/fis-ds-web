import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { PaymentHandler } from '../../../modules/payments/paymentController';
import { CHECK_YOUR_ANSWERS } from '../../urls';

@autobind
export default class PayAndSubmitPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    try {
      req.session.paymentError = false;
      const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
      const form = new Form(fields);
      const { ...formData } = form.getParsedBody(req.body);
      req.session.errors = form.getErrors(formData);
      if (req.session.errors && req.session.errors.length) {
        return super.redirect(req, res, CHECK_YOUR_ANSWERS);
      }

      /** Invoke create payment
      * 1. Create only service request for case with help with fees opted
      * 2. Create service request & payment request ref in case of pay & submit
      * */
      PaymentHandler(req, res);
      }
     catch (e) {
      req.session.paymentError = true;
      req.locals.logger.error('Error happened in pay & submit case', e);
      res.redirect(CHECK_YOUR_ANSWERS);
    }
  }
}
