import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { PCQProvider } from '../../../modules/pcq';
import { PCQController } from '../../../modules/pcq/controller';
import { PAY_YOUR_FEE, PCQ_CALLBACK_URL } from '../../../steps/urls';
import { PaymentHandler } from '../payments/paymentController';

@autobind
export default class PayAndSubmitPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    try {
      req.session.paymentError = { hasError: false, errorContext: null };
      const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase, req) : this.fields;
      const form = new Form(fields);
      const { ...formData } = form.getParsedBody(req.body);
      req.session.errors = form.getErrors(formData);
      if (req.session.errors.length) {
        return super.redirect(req, res, PAY_YOUR_FEE);
      }
      /** Invoke Pcq questionnaire
       * */
      if (!PCQProvider.getPcqId(req) && (await PCQProvider.isComponentEnabled())) {
        PCQController.launch(req, res, PCQProvider.getReturnUrl(req, PCQ_CALLBACK_URL));
      } else {
        this.handlePayment(req, res);
      }
    } catch (e) {
      req.locals.logger.error('Error happened in application submission', e);
      req.session.save(() => {
        res.redirect(PAY_YOUR_FEE);
      });
    }
  }

  public async handlePayment(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    /** Invoke create payment
     * 1. Create only service request for case with help with fees opted
     * 2. Create service request & payment request ref in case of pay & submit
     * */
    PaymentHandler(req, res);
  }
}
