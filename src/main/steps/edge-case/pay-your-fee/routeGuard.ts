import { NextFunction, Response } from 'express';

import { State } from '../../../app/case/CaseApi';
import { AppRequest } from '../../../app/controller/AppRequest';
import { TYPE_OF_APPLICATION_URL } from '../../../steps/urls';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    if (req.session.userCase.state === State.CASE_SUBMITTED_PAID) {
      res.redirect(TYPE_OF_APPLICATION_URL);
    }

    if (req.session.paymentError?.hasError === true) {
      req.session.errors = [];
    }

    req.session.save(next);
  },
};
