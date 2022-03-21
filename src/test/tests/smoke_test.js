const config = require('../e2e/config');

Feature('Smoke tests @smoke-tests');

Scenario('Sign in as citizen and verify landing page', async ({ I, landingPage }) => {
  await I.goToPage(config.baseUrl);
  await I.signIn(config.citizenUserOne);
  await landingPage.seeTheLandingPage();
});
