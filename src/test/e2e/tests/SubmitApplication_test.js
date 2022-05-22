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
    addresswithpostcode,
    uploadfilepage,
    reviewpaymentpage,
    determineapplicantrole
  }) => {
    await landingPage.seeTheLandingPage();
    await loginPage.SignInUser();
    await determineapplicantrole.DetermineApplicant(true);
    await applytoapplicantpage.applicantFullnames();
    await dateofbirth.dateSelection('10', '10', '2020');
    await addresswithpostcode.PostCodeLookUpAndSelect();
    await contactdetails.seeTheTitleOfThePage();
    await contactdetails.selectEmail();
    await uploadfilepage.uploadDocumentsSection();
    await reviewpaymentpage.seeTheTitleOfThePage();
    await reviewpaymentpage.selectPayByCard();
    //await familypage.seeTheTitleOfThePage();
    //await familypage.selectAdoptionService();
    //await adoptionpage.selectInternationalAdoption();
  }
);
