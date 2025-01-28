import { NextFunction, Response } from 'express';

import { CaseWithId } from '../../../app/case/case';
import { AppRequest } from '../../../app/controller/AppRequest';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    if (req.body?.edgeCaseTypeOfApplication !== req.session?.userCase?.edgeCaseTypeOfApplication) {
      const caseData = {
        edgeCaseTypeOfApplication: req.body.edgeCaseTypeOfApplication,
      };

      if (req.session.userCase?.id) {
        Object.assign(caseData, {
          id: req.session.userCase.id,
        });
      }

      req.session.userCase = {
        ...caseData,
      } as CaseWithId;

      return req.session.save(next);
    }
    next();
  },
};
