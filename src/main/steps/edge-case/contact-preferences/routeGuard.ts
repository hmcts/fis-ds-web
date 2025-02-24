import { NextFunction, Response } from 'express';

import { ContactPreference } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    if (req.body.contactPreferenceType === ContactPreference.ACCOUNT_OWNER) {
      req.session.userCase.applicantEmailAddress = req.session.user.email;
    } else {
      req.session.userCase.applicantEmailAddress = '';
    }
    next();
  },
};
