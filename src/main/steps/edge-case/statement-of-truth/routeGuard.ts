import { NextFunction, Response } from 'express';

import { CASE_EVENT, PaymentErrorContext, TYPE_OF_APPLICATION } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { STATEMENT_OF_TRUTH } from '../../../steps/urls';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    const caseData = req.session.userCase;
    const typeOfApplication = caseData?.edgeCaseTypeOfApplication;
    req.session.paymentError = { hasError: false, errorContext: null };
    req.session.errors = [];

    if (
      req.body['applicantStatementOfTruth'] &&
      [TYPE_OF_APPLICATION.FGM, TYPE_OF_APPLICATION.FMPO].includes(typeOfApplication)
    ) {
      try {
        await req.locals.api.updateCase(caseData, CASE_EVENT.SUBMIT_DA_CASE);
      } catch (e) {
        req.locals.logger.error(e);
        req.session.paymentError = { hasError: true, errorContext: PaymentErrorContext.APPLICATION_NOT_SUBMITTED };
        return req.session.save(() => {
          res.redirect(STATEMENT_OF_TRUTH);
        });
      }
    }
    next();
  },
};
