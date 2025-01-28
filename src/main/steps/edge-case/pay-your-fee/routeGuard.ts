import { NextFunction, Response } from 'express';

import { Case } from '../../../app/case/case';
import { AppRequest } from '../../../app/controller/AppRequest';
import { getApplicationFee } from '../../../steps/edge-case/fees/fees-lookup-api';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      await retriveFeeAmount(req, next);
    } catch {
      console.log('failed to fetch fee details');
    }
  },
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const retriveFeeAmount = async (req: AppRequest<Partial<Case>>, next: NextFunction) => {
  try {
    const applicationFee = (
      await getApplicationFee(req.session.user, req.session.userCase?.edgeCaseTypeOfApplication, req.locals.logger)
    )?.feeAmount;
    
    if (applicationFee) {
      req.session.userCase = {
        ...(req.session.userCase ?? {}),
        applicationFee,
      };
      return req.session.save(next);
    }

    next();
  } catch {
    req.session.save(next);
  }
};
