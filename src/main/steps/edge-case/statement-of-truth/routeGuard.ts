import { NextFunction, Response } from 'express';

import { CASE_EVENT, PaymentErrorContext, TYPE_OF_APPLICATION } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { STATEMENT_OF_TRUTH } from '../../../steps/urls';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    const typeOfApplication = req.session.userCase?.edgeCaseTypeOfApplication;
    req.session.paymentError = { hasError: false, errorContext: null };

    if (
      !req.body['applicantStatementOfTruth'] ||
      [
        TYPE_OF_APPLICATION.DECLARATION_OF_PARENTAGE,
        TYPE_OF_APPLICATION.PARENTAL_ORDER,
        TYPE_OF_APPLICATION.SPECIAL_GUARDIANSHIP_ORDER,
      ].includes(typeOfApplication!)
    ) {
      return next();
    }

    try {
      await req.locals.api.updateCase(req.session.userCase, CASE_EVENT.CASE_SUBMIT);
      req.session.save(() => next());
    } catch (e) {
      req.locals.logger.error(e);
      req.session.paymentError = { hasError: true, errorContext: PaymentErrorContext.APPLICATION_NOT_SUBMITTED };
      req.session.save(() => {
        res.redirect(STATEMENT_OF_TRUTH);
      });
    }
  },
};
