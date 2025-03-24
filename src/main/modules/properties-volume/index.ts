import { execSync } from 'child_process';

import * as propertiesVolume from '@hmcts/properties-volume';
import config from 'config';
import { Application } from 'express';
import { get, set } from 'lodash';

export class PropertiesVolume {
  enableFor(app: Application): void {
    if (!app.locals.developmentMode) {
      propertiesVolume.addTo(config);
      this.setSecret('secrets.fis-kv.AppInsightsInstrumentationKey', 'appInsights.instrumentationKey');
      this.setSecret('secrets.fis-kv.idam-ui-secret', 'services.idam.clientSecret');
      this.setSecret('secrets.fis-kv.idam-system-user-name', 'services.idam.systemUsername');
      this.setSecret('secrets.fis-kv.idam-system-user-password', 'services.idam.systemPassword');
      this.setSecret('secrets.fis-kv.redis-access-key-dss-create-case', 'session.redis.key');
      this.setSecret('secrets.fis-kv.redis-access-key-dss-create-case', 'session.secret');
      this.setSecret('secrets.fis-kv.s2s-secret', 'services.authProvider.secret');
      this.setSecret('secrets.fis-kv.postcode-lookup-token', 'services.postcodeLookup.token');
      this.setSecret('secrets.fis-kv.prl-pcq-token-key', 'services.equalityAndDiversity.tokenKey');
      // this.setSecret('secrets.ds.adoption-pcq-token', 'services.equalityAndDiversity.tokenKey');
    } else {
      this.setLocalSecret('idam-ui-secret', 'services.idam.clientSecret');
      this.setLocalSecret('s2s-secret', 'services.authProvider.secret');
      this.setLocalSecret('postcode-lookup-token', 'services.postcodeLookup.token');
      this.setLocalSecret('prl-pcq-token-key', 'services.equalityAndDiversity.tokenKey');
      // this.setLocalSecret('idam-systemupdate-username', 'services.idam.systemUsername');
      // this.setLocalSecret('idam-systemupdate-password', 'services.idam.systemPassword');
      // this.setLocalSecret('e2e-test-user-password', 'e2e.userTestPassword');
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
    const result = execSync(`az keyvault secret show --vault-name fis-kv-aat -o tsv --query value --name ${secret}`);
    set(config, toPath, result.toString().replace('\n', ''));
  }
}
