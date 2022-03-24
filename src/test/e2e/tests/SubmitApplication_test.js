Feature('Create application').retry(1);

Scenario(
  'Create full application and submit',
  async ({
    loginPage,
    landingPage,
    familypage,
  }) => {
    await loginPage.SignInUser();
    await landingPage.seeTheLandingPage();
    await landingPage.selectjurisdictionasfamily();

    await familypage.seeTheTitleOfThePage();
    await familypage.selectAdoptionService();
  }
);