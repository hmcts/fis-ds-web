/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextFunction, Response } from 'express';

import { Case } from '../../../../app/case/case';
import { YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { getApplicationFee } from '../../../../steps/edge-case/fees/fees-lookup-api';

export const routeGuard = {
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      req.session.errors = req.session.errors?.filter(error => error.errorType !== 'errorFetchingFee');
      await retriveFeeAmount(req, next);
    } catch {
      console.log('failed to fetch fee details');
    }
  },
  post: (req: AppRequest, res: Response, next: NextFunction) => {
    if (req.body.hwfPaymentSelection === YesOrNo.NO) {
      delete req.session.userCase?.feesAppliedDetails;
      delete req.session?.userCase?.helpWithFeesReferenceNumber;
    }

    req.session.save(next);
  },
};

const retriveFeeAmount = async (req: AppRequest<Partial<Case>>, next: NextFunction) => {
  try {
    const applicationFee = (
      await getApplicationFee(req.session.user, req.session.userCase.edgeCaseTypeOfApplication, req.locals.logger)
    )?.feeAmount;

    if (applicationFee) {
      Object.assign(req.session.userCase, { applicationFee });
      return req.session.save(next);
    }

    next();
  } catch {
    req.session.paymentError = { hasError: false, errorContext: null };
    req.session.errors = [{ errorType: 'errorFetchingFee', propertyName: '*' }];
    req.session.save(next);
  }
};
