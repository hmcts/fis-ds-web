import { NextFunction, Response } from 'express';

import { CaseWithId } from '../../../app/case/case';
import { AppRequest } from '../../../app/controller/AppRequest';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post: async (req: AppRequest, res: Response, next: NextFunction) => {
    req.session.userCase = {
      edgeCaseTypeOfApplication: req.body.edgeCaseTypeOfApplication,
    } as CaseWithId;

    req.session.save(next);
  },
};
