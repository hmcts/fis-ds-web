import { execSync } from 'child_process';

import * as propertiesVolume from '@hmcts/properties-volume';
import config from 'config';
import { Application } from 'express';
import { get, set } from 'lodash';

export class PropertiesVolume {
  enableFor(app: Application): void {
    if (!app.locals.developmentMode) {
      propertiesVolume.addTo(config);
      this.setSecret('secrets.ds.AppInsightsInstrumentationKey', 'appInsights.instrumentationKey');
      this.setSecret('secrets.ds.idam-ui-secret', 'services.idam.clientSecret');
      this.setSecret('secrets.ds.idam-system-user-name', 'services.idam.systemUsername');
      this.setSecret('secrets.ds.idam-system-user-password', 'services.idam.systemPassword');
      this.setSecret('secrets.ds.redis-access-key', 'session.redis.key');
      this.setSecret('secrets.ds.redis-access-key', 'session.secret');
      this.setSecret('secrets.ds.s2s-secret', 'services.authProvider.secret');
      // this.setSecret('secrets.ds.postcode-lookup-token', 'services.postcodeLookup.token');
      // this.setSecret('secrets.ds.adoption-pcq-token', 'services.equalityAndDiversity.tokenKey');
    } else {
      this.setLocalSecret('idam-ui-secret', 'services.idam.clientSecret');
      this.setLocalSecret('s2s-secret', 'services.authProvider.secret');
      // this.setLocalSecret('postcode-lookup-token', 'services.postcodeLookup.token');
      // this.setLocalSecret('idam-systemupdate-username', 'services.idam.systemUsername');
      // this.setLocalSecret('idam-systemupdate-password', 'services.idam.systemPassword');
      // this.setLocalSecret('e2e-test-user-password', 'e2e.userTestPassword');
      // this.setLocalSecret('adoption-pcq-token', 'services.equalityAndDiversity.tokenKey');
    }
  }

  private setSecret(fromPath: string, toPath: string): void {
    if (config.has(fromPath)) {
      set(config, toPath, get(config, fromPath));
    }
  }

  /**
   * Load a secret from the AAT vault using azure cli
   */
  private setLocalSecret(secret: string, toPath: string): void {
    const result = execSync(`az keyvault secret show --vault-name ds-aat -o tsv --query value --name ${secret}`);
    set(config, toPath, result.toString().replace('\n', ''));
  }

  /**
   * Load a secret from the AAT vault using azure cli
   */
  // private setLocalSecret1(secret: string, toPath: string): void {
  //   const result = execSync(`az keyvault secret show --vault-name adoption-aat -o tsv --query value --name ${secret}`);
  //   set(config, toPath, result.toString().replace('\n', ''));
  // }
}
