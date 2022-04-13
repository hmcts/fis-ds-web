import autobind from 'autobind-decorator';
import { Response } from 'express';
import { v4 as generateUuid } from 'uuid';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController } from '../../../../app/controller/GetController';
import { getFee } from '../../../../app/fee/fee-lookup-api';
import { FEE_APPLICATION_TYPES } from '../../../constants';
import { LabelMessages } from '../../../labelMessages';

@autobind
export default class PayYourFeeGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const applicationType =
      req.session.userCase?.serviceType === 'Yes'
        ? req.session.userCase?.applyingWithAdoption
        : req.session.userCase?.applyingWithPrivateLaw;
    let feeApplicationType = '';

    const tempServiceType = req.session.userCase.serviceType;
    const tempApplyingWithAdoption = req.session.userCase.applyingWithAdoption;
    const tempApplyingWithPrivateLaw = req.session.userCase.applyingWithPrivateLaw;

    switch (applicationType) {
      case LabelMessages.ADOPTION_ONE: {
        feeApplicationType = FEE_APPLICATION_TYPES.APPLY_ADOPTION;
        break;
      }
      case LabelMessages.ADOPTION_TWO: {
        feeApplicationType = FEE_APPLICATION_TYPES.APPLY_ADOPTION;
        break;
      }
      case LabelMessages.ADOPTION_THREE: {
        feeApplicationType = FEE_APPLICATION_TYPES.APPLY_ADOPTION;
        break;
      }
      case LabelMessages.ADOPTION_FOUR: {
        feeApplicationType = FEE_APPLICATION_TYPES.APPLY_PARENT;
        break;
      }
      case LabelMessages.PRL_FOUR: {
        feeApplicationType = FEE_APPLICATION_TYPES.PQR;
        break;
      }
      case LabelMessages.PRL_THREE: {
        feeApplicationType = FEE_APPLICATION_TYPES.SPECIAL_GUARDIAN;
        break;
      }
      case LabelMessages.PRL_FIVE: {
        feeApplicationType = FEE_APPLICATION_TYPES.PRIVATE;
        break;
      }
      default: {
        feeApplicationType = FEE_APPLICATION_TYPES.NO_FEE;
        break;
      }
    }
    if (feeApplicationType !== FEE_APPLICATION_TYPES.NO_FEE) {
      const fee = await getFee(req.locals.logger, feeApplicationType);

      if (fee) {
        const total = fee.FeeAmount;
        req.session.userCase = await this.save(
          req,
          {
            applicationFeeOrderSummary: {
              PaymentReference: '',
              Fees: [{ id: generateUuid(), value: { ...fee } }],
              PaymentTotal: `${total}`,
            },
          },
          this.getEventName(req)
        );

        // here we explicitly assigning the values to userCase to get the title
        if (typeof req.session.userCase !== 'undefined' && req.session.userCase !== null) {
          req.session.userCase.serviceType = tempServiceType;
          req.session.userCase.applyingWithAdoption = tempApplyingWithAdoption;
          req.session.userCase.applyingWithPrivateLaw = tempApplyingWithPrivateLaw;
        }

        req.session.save(err => {
          if (err) {
            throw err;
          }
          super.get(req, res);
        });
        return;
      } else {
        throw new Error('Unable to get fee from fee-register API');
      }
    }
    req.session.userCase.applicationFeeOrderSummary = undefined;
    super.get(req, res);
  }
}
