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
    additiondocumentpage,
    emailaddresspage,
    checkyouranswerspage,
    contactnumber
  }) => {
    await landingPage.seeTheLandingPage();
    await loginPage.SignInUser();
    await determineapplicantrole.DetermineApplicant(true);
    await applytoapplicantpage.applicantFullnames();
    await dateofbirth.dateSelection('10', '10', '2020');
    await addresswithpostcode.PostCodeLookUpAndSelect();
    await contactpreferencepage.contactPreference();
    await emailaddresspage.emailAddress();
    await contactnumber.EnterHomeAndMobileNo('4423232323232', '4423232323232');
    await uploadfilepage.uploadDocumentsSection();
    await additiondocumentpage.uploadDocumentsSection();
    await checkyouranswerspage.checkyouranswers();
    await statementoftruth.statementOfTruth();
  }
);
