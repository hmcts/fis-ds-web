Feature('Create application @e2e-tests').retry(1);

Scenario(
  'Create full application and submit',
  async ({
    loginPage,
    landingPage,
    familypage,
    applytoapplicantpage,
    adoptionpage,
    contactdetails,
    dateofbirth,
    addresswithpostcode
  }) => {
    await loginPage.SignInUser();
    await landingPage.seeTheLandingPage();
    await landingPage.selectjurisdictionasfamily();
    await familypage.seeTheTitleOfThePage();
    await familypage.selectAdoptionService();
    await adoptionpage.selectInternationalAdoption();
    await applytoapplicantpage.applicantFullnames();
    await dateofbirth.dateSelection('10', '10', '2020');
    await addresswithpostcode.PostCodeLookUpAndSelect();
    await contactdetails.seeTheTitleOfThePage();
    await contactdetails.selectEmail();
  }
);
