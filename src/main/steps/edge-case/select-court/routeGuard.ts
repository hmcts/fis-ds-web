import { NextFunction, Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { TYPE_OF_APPLICATION } from '../../../app/case/definition';
import { GENERIC_ERROR_PAGE } from '../../../steps/urls';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      if (
        ![TYPE_OF_APPLICATION.FGM, TYPE_OF_APPLICATION.FMPO].includes(req.session.userCase?.edgeCaseTypeOfApplication)
      ) {
        res.redirect(GENERIC_ERROR_PAGE);
      }

      const courts = await req.locals.api.getCourtList();

      if (!courts.length) {
        res.redirect(GENERIC_ERROR_PAGE);
      }

      Object.assign(req.session.applicationSettings, {
        availableCourts: courts
          .filter(court => court?.site_name && !['', null, 'Royal Courts of Justice'].includes(court.site_name))
          .map(court => ({
            id: court.epmsId,
            name: court.court_name,
          })),
      });
      req.session.save(next);
    } catch {
      res.redirect(GENERIC_ERROR_PAGE);
    }
  },
};
