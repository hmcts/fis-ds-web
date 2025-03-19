/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextFunction, Response } from 'express';
import _ from 'lodash';

import { State } from '../../../app/case/CaseApi';
import { CaseWithId } from '../../../app/case/case';
import { CASE_EVENT, PaymentErrorContext, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { APPLICATION_SUBMITTED, PAY_YOUR_FEE, STATEMENT_OF_TRUTH, TYPE_OF_APPLICATION_URL } from '../../../steps/urls';
import { isFGMOrFMPOCase } from '../util';
import { PCQController } from '../../../modules/pcq/controller';
import { PCQProvider } from '../../../modules/pcq';
//import { PCQProvider } from '../../../modules/pcq';

export const routeGuard = {
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    const caseData = req.session.userCase;
    const typeOfApplication = caseData?.edgeCaseTypeOfApplication;
    req.session.paymentError = { hasError: false, errorContext: null };
    req.session.errors = [];
    const caseEvent = isFGMOrFMPOCase(typeOfApplication)
      ? CASE_EVENT.SUBMIT_DA_CASE
      : CASE_EVENT.SUBMIT_CA_CASE_WITH_HWF;

    if (req.body['applicantStatementOfTruth'] && !isFGMOrFMPOCase(typeOfApplication)) {
      if(caseData.hwfPaymentSelection === YesOrNo.YES && !_.isEmpty(caseData.helpWithFeesReferenceNumber)) {
        try {
          req.session.userCase = (await req.locals.api.updateCase(caseData, caseEvent)) as CaseWithId;
          PCQController.launch(req, res, PCQProvider.getReturnUrl(req, APPLICATION_SUBMITTED));
          /* return req.session.save(() => {
            res.redirect(APPLICATION_SUBMITTED);
          }); */
        } catch (e) {
          req.locals.logger.error(e);
          req.session.paymentError = { hasError: true, errorContext: PaymentErrorContext.APPLICATION_NOT_SUBMITTED };
          return req.session.save(() => {
            res.redirect(STATEMENT_OF_TRUTH);
          });
        }
      } else {
        PCQController.launch(req, res, PCQProvider.getReturnUrl(req, PAY_YOUR_FEE));
      }
    } else if (
      req.body['applicantStatementOfTruth'] &&
      (isFGMOrFMPOCase(typeOfApplication) ||
        (caseData.hwfPaymentSelection === YesOrNo.YES && !_.isEmpty(caseData.helpWithFeesReferenceNumber)))
    ) {
      try {
        req.session.userCase = (await req.locals.api.updateCase(caseData, caseEvent)) as CaseWithId;
        return req.session.save(() => {
          res.redirect(APPLICATION_SUBMITTED);
        });
      } catch (e) {
        req.locals.logger.error(e);
        req.session.paymentError = { hasError: true, errorContext: PaymentErrorContext.APPLICATION_NOT_SUBMITTED };
        return req.session.save(() => {
          res.redirect(STATEMENT_OF_TRUTH);
        });
      }
    } else {
        next();
    }
  },
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    if (
      req.session.userCase.state === State.CASE_SUBMITTED_PAID ||
      req.session.userCase.state === State.CASE_SUBMITTED_NOT_PAID
    ) {
      return res.redirect(TYPE_OF_APPLICATION_URL);
    }
    next();
  },
};
