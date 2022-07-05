const config = require('../config');

Feature('Smoke tests @smoke-tests @cross-browser ').retry(1);

Scenario('Sign in as citizen and create a case', async ({ loginPage, landingPage }) => {

  await landingPage.seeTheLandingPage();
  await loginPage.SignInUser();
});
