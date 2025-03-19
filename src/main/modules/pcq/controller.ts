//import config from 'config';
import { AppRequest } from "app/controller/AppRequest";
import { Response } from 'express';
import { PCQProvider } from '.';
import { AxiosError } from 'axios';
import config from 'config';

export class PcqController{

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
    console.log('PCQ completed');
  }
}

export const PCQController = new PcqController();