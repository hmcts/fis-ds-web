import { Application } from 'express';

/* Importing the healthcheck module. */
const healthcheck = require('@hmcts/nodejs-healthcheck');

/* Creating a health check endpoint for the application. */
export default function (app: Application): void {
  const healthCheckConfig = {
    checks: {
      // TODO: replace this sample check with proper checks for your application
      sampleCheck: healthcheck.raw(() => healthcheck.up()),
    },
  };

  /* Adding the healthcheck to the app. */
  healthcheck.addTo(app, healthCheckConfig);
}
