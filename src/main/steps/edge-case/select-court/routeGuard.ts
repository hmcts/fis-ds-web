import { NextFunction, Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GENERIC_ERROR_PAGE } from '../../../steps/urls';
import { isFGMOrFMPOCase } from '../util';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      if (!isFGMOrFMPOCase(req.session.userCase?.edgeCaseTypeOfApplication)) {
        res.redirect(GENERIC_ERROR_PAGE);
      }

      const courts = await req.locals.api.getCourtList();

      if (!courts.length) {
        res.redirect(GENERIC_ERROR_PAGE);
      }

      Object.assign(req.session.applicationSettings, {
        availableCourts: courts,
      });
      req.session.save(next);
    } catch {
      res.redirect(GENERIC_ERROR_PAGE);
    }
  },
};
