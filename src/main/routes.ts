import fs from 'fs';

import { Application, RequestHandler } from 'express';

import { GetController } from './app/controller/GetController';
import { PostController } from './app/controller/PostController';
import { KeepAliveController } from './app/keepalive/KeepAliveController';
import { stepsWithContent } from './steps';
import { ErrorController } from './steps/error/error.controller';
import { HomeGetController } from './steps/home/get';
import { SaveSignOutGetController } from './steps/save-sign-out/get';
// import { TaskListGetController } from './steps/task-list/get';
import { TimedOutGetController } from './steps/timed-out/get';
import {
  CSRF_TOKEN_ERROR_URL,
  HOME_URL,
  KEEP_ALIVE_URL,
  SAVE_AND_SIGN_OUT,
  // TASK_LIST_URL,
  TIMED_OUT_URL,
} from './steps/urls';

export class Routes {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;
    const errorController = new ErrorController();

    app.get(CSRF_TOKEN_ERROR_URL, errorHandler(errorController.CSRFTokenError));
    app.get(HOME_URL, errorHandler(new HomeGetController().get));
    app.get(SAVE_AND_SIGN_OUT, errorHandler(new SaveSignOutGetController().get));
    app.get(TIMED_OUT_URL, errorHandler(new TimedOutGetController().get));

    for (const step of stepsWithContent) {
      const files = fs.readdirSync(`${step.stepDir}`);

      const getControllerFileName = files.find(item => /get/i.test(item) && !/test/i.test(item));
      const getController = getControllerFileName
        ? require(`${step.stepDir}/${getControllerFileName}`).default
        : GetController;

      app.get(step.url, errorHandler(new getController(step.view, step.generateContent).get));

      if (step.form) {
        const postControllerFileName = files.find(item => /post/i.test(item) && !/test/i.test(item));
        const postController = postControllerFileName
          ? require(`${step.stepDir}/${postControllerFileName}`).default
          : PostController;
        app.post(step.url, errorHandler(new postController(step.form.fields).post));
      }
    }

    app.get(KEEP_ALIVE_URL, errorHandler(new KeepAliveController().get));

    app.use(errorController.notFound as unknown as RequestHandler);
  }
}
