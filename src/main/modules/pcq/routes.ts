import { Application } from 'express';

import { PCQ_CALLBACK_URL } from '../../steps/urls';

import { PcqController, //PCQController 
} from './controller';

export class PcqRoute {
   enable(app: Application): void {
    const { errorHandler } = app.locals;

    app.get(PCQ_CALLBACK_URL, errorHandler( new PcqController().onPcqCompletion));
  }
}

export const PCQRoute = new PcqRoute();
