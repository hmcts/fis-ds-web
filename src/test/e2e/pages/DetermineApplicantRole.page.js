const { I } = inject();
var assert = require('assert');

module.exports = {
  fields: {
    ApplyingForSomeone: 'input[id$="applyingForSelf-2"]',
    ApplyingForYourself: 'input[id$="applyingForSelf"]'
  },
  async DetermineApplicant(applyingForSomeone) {
    await I.wait(2);
    await I.see('Are you named as the applicant on the application form you are submitting?');
    if(applyingForSomeone)
    {   
        await I.click(this.fields.ApplyingForSomeone);
    }
    else{
        await I.click(this.fields.ApplyingForYourself);
    }
    await I.wait(2);
    await I.click('Continue');
    await I.wait('4');
  },
};
