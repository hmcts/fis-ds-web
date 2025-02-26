import { NextFunction, Response } from 'express';

import { CaseWithId } from '../../../app/case/case';
import { UserRole } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { isFGMOrFMPOCase } from '../util';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    if (req.body?.edgeCaseTypeOfApplication !== req.session?.userCase?.edgeCaseTypeOfApplication) {
      req.session.userCase = {
        edgeCaseTypeOfApplication: req.body.edgeCaseTypeOfApplication,
      } as CaseWithId;

      if (!isFGMOrFMPOCase(req.body.edgeCaseTypeOfApplication!)) {
        req.session.userCase = {
          ...req.session.userCase,
          whomYouAreApplying: UserRole.SELF,
          applicantFirstName: req.session.user.givenName,
          applicantLastName: req.session.user.familyName,
          applicantEmailAddress: req.session.user.email,
        };
      }
      return req.session.save(next);
    }
    next();
  },
};
