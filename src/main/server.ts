import * as path from 'path';

import * as bodyParser from 'body-parser';
import config from 'config';
import express, { RequestHandler } from 'express';
import favicon from 'serve-favicon';
import toobusy from 'toobusy-js';
import type { LoggerInstance } from 'winston';

import { AppInsights } from './modules/appinsights';
import { AuthProvider } from './modules/auth-provider';
import { AxiosLogger } from './modules/axios-logger';
import { CSRFToken } from './modules/csrf';
import { ErrorHandler } from './modules/error-handler';
import { FileUpload } from './modules/fileupload';
import { HealthCheck } from './modules/health';
import { Helmet } from './modules/helmet';
import { LanguageToggle } from './modules/i18n';
import { Nunjucks } from './modules/nunjucks';
import { OidcMiddleware } from './modules/oidc';
import { PropertiesVolume } from './modules/properties-volume';
import { SessionStorage } from './modules/session';
import { StateRedirectMiddleware } from './modules/state-redirect';
import { LoadTimeouts } from './modules/timeouts';
import { TooBusy } from './modules/too-busy';
import { Webpack } from './modules/webpack';
import { Routes } from './routes';
import { PublicRoutes } from './routes/authless/routes';

const { Logger } = require('@hmcts/nodejs-logging');
const logger: LoggerInstance = Logger.getLogger('server');
const app = express();

/* This is setting up the express app. */
app.locals.developmentMode = process.env.NODE_ENV !== 'production';
app.use(favicon(path.join(__dirname, '/public/assets/images/favicon.ico')));
app.use(bodyParser.json() as RequestHandler);
app.use(bodyParser.urlencoded({ extended: false }) as RequestHandler);
app.use(express.static(path.join(__dirname, 'public')));

/* This is a middleware that will set the cache control header to no-cache. */
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
  next();
});

/* Enabling the file upload middleware for the app. */
new FileUpload().enableFor(app);
/* Enabling the AxiosLogger middleware for the app. */
new AxiosLogger().enableFor(app);
/* Loading the properties from the volume. */
new PropertiesVolume().enableFor(app);
/* Enabling the error handler for the app. */
new ErrorHandler().enableFor(app, logger);
/* Setting the timeouts for the application. */
new LoadTimeouts().enableFor(app);
/* Enabling the Nunjucks templating engine for the app. */
new Nunjucks().enableFor(app);
/* Enabling the webpack middleware for the app. */
new Webpack().enableFor(app);
/* Helmet is a middleware that sets various HTTP headers to help protect your app. */
new Helmet(config.get('security')).enableFor(app);
/* Enabling the Application Insights for the application. */
new AppInsights().enable();
/* Enabling the session storage for the app. */
new SessionStorage().enableFor(app);
/* A middleware that will return a HTTP 503 error if the server is too busy. */
new TooBusy().enableFor(app);
/* Enabling the health check endpoint for the application. */
new HealthCheck().enableFor(app);
/* Enabling the CSRF token for the application. */
new CSRFToken().enableFor(app);
/* Enabling the language toggle for the application. */
new LanguageToggle().enableFor(app);
/* Enabling the AuthProvider for the application. */
new AuthProvider().enable();
/* Enabling the public routes for the application. */
new PublicRoutes().enableFor(app);
/* Enabling the OIDC middleware for the application. */
new OidcMiddleware().enableFor(app);
/* A middleware that will redirect the user to the state parameter if it is present in the query
string. */
new StateRedirectMiddleware().enableFor(app);
/* Enabling the routes for the application. */
new Routes().enableFor(app);
/* This is a middleware that will catch any errors that are thrown by the next middleware. */
new ErrorHandler().handleNextErrorsFor(app);

const port = config.get('port');
const server = app.listen(port, () => {
  logger.info(`Application started: http://localhost:${port}`);
});

process.on('SIGINT', function () {
  server.close();
  toobusy.shutdown();
  process.exit();
});
