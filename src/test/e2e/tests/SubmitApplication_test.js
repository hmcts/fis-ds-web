const ContactPreferencePage = require("../pages/ContactPreference.page");

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
    determineapplicantrole,
    statementoftruth,
    contactpreferencepage,
    additionaldocumentpage
  }) => {
    await landingPage.seeTheLandingPage();
    await loginPage.SignInUser();
    await determineapplicantrole.DetermineApplicant(true);
    await applytoapplicantpage.applicantFullnames();
    await dateofbirth.dateSelection('10', '10', '2020');
    await addresswithpostcode.PostCodeLookUpAndSelect();
    await contactpreferencepage.contactPreference();
    await contactdetails.seeTheTitleOfThePage();
    await contactdetails.selectEmail();
    await uploadfilepage.uploadDocumentsSection();
    await additionaldocumentpage.uploadDocumentsSection();
    await statementoftruth.statementOfTruth();
    //await reviewpaymentpage.seeTheTitleOfThePage();
    //await reviewpaymentpage.selectPayByCard();
    //await familypage.seeTheTitleOfThePage();
    //await familypage.selectAdoptionService();
    //await adoptionpage.selectInternationalAdoption();
  }
);
