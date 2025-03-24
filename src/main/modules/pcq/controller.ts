//import config from 'config';
import { AxiosError } from 'axios';
import config from 'config';
import { Response } from 'express';

import { YesOrNo } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { PaymentHandler } from '../../steps/edge-case/payments/paymentController';
import { PAY_YOUR_FEE, STATEMENT_OF_TRUTH } from '../../steps/urls';

import { PCQProvider } from '.';

export class PcqController {
  async launch(req: AppRequest, res: Response, returnUrl: string): Promise<void> {
    try {
      PCQProvider.initialiseLogger(req);
      const url = config.get('services.equalityAndDiversity.url');
      const path: string = config.get('services.equalityAndDiversity.path');
      await PCQProvider.service.getPcqHealthStatus(`${url}/health`);
      const pcqServiceUrl = await PCQProvider.getPcqServiceUrl(url as string, path, req, returnUrl);
      req.session.save(err => {
        if (err) {
          req.locals.logger.error('Error', err);
          throw err;
        }
        return res.redirect(pcqServiceUrl);
      });
    } catch (error) {
      if (!res.headersSent) {
        PcqController.handleError(error, res, returnUrl);
      }
    }
  }

  protected static handleError(error: string | AxiosError, res: Response, redirectUrl: string): void {
    PCQProvider.log('error', error);
    if (!res.headersSent) {
      res.redirect(redirectUrl);
    }
  }

  async onPcqCompletion(req: AppRequest, res: Response): Promise<void> {
    // submit the case in case of non-payment scenario
    // or-else redirect to payment screen
    try {
      return PaymentHandler(req, res);
    } catch (error) {
      const url = req.session.userCase.hwfPaymentSelection === YesOrNo.NO ? PAY_YOUR_FEE : STATEMENT_OF_TRUTH;
      PcqController.handleError(error, res, url);
    }
    console.log('PCQ completed');
  }
}

export const PCQController = new PcqController();
