/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextFunction, Response } from 'express';

import { YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject } from '../../../../app/controller/PostController';
import { SIGN_OUT_URL } from '../../../../steps/urls';

export const routeGuard = {
  post: async (req: AppRequest<AnyObject>, res: Response, next: NextFunction) => {
    const { cancel, feesAppliedDetails, helpWithFeesReferenceNumber } = req.body;
    req.session.userCase.feesAppliedDetails = feesAppliedDetails as YesOrNo;
    if (feesAppliedDetails === YesOrNo.NO) {
      delete req.session.userCase.helpWithFeesReferenceNumber;
    } else {
      req.session.userCase.helpWithFeesReferenceNumber = helpWithFeesReferenceNumber as string;
    }

    if (cancel) {
      return res.redirect(SIGN_OUT_URL);
    }

    req.session.save(next);
  },
};
