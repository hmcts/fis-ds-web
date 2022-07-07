import { Application } from 'express';

import { LandingController } from './controllers/landing';
import { Path } from './path';

/* It's a class that has a method that takes an express application as a parameter and then adds a
route to that application */
export class PublicRoutes {
  public enableFor(app: Application): void {
    /**
     * @GET
     */
    /* It's adding a route to the express application. */
    app.get(Path.LANDING, LandingController);
  }
}
