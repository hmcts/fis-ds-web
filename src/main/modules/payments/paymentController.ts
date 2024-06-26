import config from 'config';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { CHECK_YOUR_ANSWERS, APPLICATION_SUBMITTED } from '../../steps/urls';

import { CheckPaymentStatusApi, PaymentTaskResolver } from './paymentApi';
import { PaymentHelper } from './paymentHelper';
const SUCCESS = 'Success';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const PaymentHandler = async (req: AppRequest, res: Response) => {
  try {
    const paymentHelperTranspiler = await new PaymentHelper().SystemCredentailsToApiData(req);
    const { Authorization, ServiceAuthorization, returnUrL, id } =
      paymentHelperTranspiler;
    const paymentApiEndpoint = config.get('services.cos.url');
    const createPaymentEndpoint = '/fees-and-payment-apis/create-payment';
    const baseURL = paymentApiEndpoint + createPaymentEndpoint;

    const paymentCreator = new PaymentTaskResolver(
      baseURL,
      Authorization,
      ServiceAuthorization,
      id,
      returnUrL
    );
    const response = await paymentCreator.getPaymentCredentails();

    req.session.paymentDetails = response;
    if (response?.serviceRequestReference && response?.payment_reference && response?.status === SUCCESS) {
      //previous payment is success, retry submit case with 'citizen-case-submit' & reidrect confirmation page
      submitCase(
        req,
        res,
        req.session.userCase!.id!,
        req.session.userCase
      );
    } else if (response['next_url']) {
      //redirect to gov pay for making payment
      res.redirect(response['next_url']);
    } else {
      //redirect to check your answers with error
      populateError(req, res, 'Error in create service request/payment reference');
    }
  } catch (e) {
    req.locals.logger.error(e);
    populateError(req, res, 'Error in create service request/payment reference');
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const PaymentValidationHandler = async (req: AppRequest, res: Response) => {
  if (!req.params.hasOwnProperty('status') && !req.params.hasOwnProperty('paymentId')) {
    res.status(500);
  } else {
    try {
      const { id } = req.session.userCase;
      const PaymentURL =
        config.get('services.cos.url') +
        `/fees-and-payment-apis/retrievePaymentStatus/${req.session?.paymentDetails?.['payment_reference']}/${id}`;
      const paymentHelperTranspiler = await new PaymentHelper().SystemCredentailsToApiData(req);
      const { Authorization, ServiceAuthorization } = paymentHelperTranspiler;
      const checkPayment = await new CheckPaymentStatusApi(PaymentURL, Authorization, ServiceAuthorization)
        .PaymentStatusInstance()
        .get('');
      const paymentStatus = checkPayment['data']['status'];
      if (paymentStatus && paymentStatus === SUCCESS) {
        req.session.paymentSuccessDetails = checkPayment['data'];
        //Invoke update case with 'citizen-case-submit' event & reidrect confirmation page
        submitCase(
          req,
          res,
          req.session.userCase!.id!,
          req.session.userCase
        );
      } else {
        populateError(req, res, 'Error in retreive payment status');
      }
    } catch (error) {
      req.locals.logger.error(error);
      populateError(req, res, 'Error in retreive payment status');
    }
  }
};

export async function submitCase(
  req: AppRequest,
  res: Response,
  caseId: string,
  caseData: any,
): Promise<void> {
  try {
    req.session.paymentError = false;
    await req.locals.api.updateCase(caseData, caseId);
    //update final document in session for download on confirmation
    req.session.paymentError = false;
    //save & redirect to confirmation page
    req.session.save(() => {
      res.redirect(APPLICATION_SUBMITTED);
    });
  } catch (e) {
    req.locals.logger.error(e);
    populateError(req, res, 'Error in submit case');
  }
}

const populateError = (req: AppRequest, res: Response, errorMsg: string) => {
  req.locals.logger.error(errorMsg);
  req.session.paymentError = true;
  req.session.save(() => {
    res.redirect(CHECK_YOUR_ANSWERS);
  });
};