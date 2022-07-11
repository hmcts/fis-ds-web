const { I } = inject();
var assert = require('assert');  
const DetermineRoleDetails = require('../fixtures/content/DetermineRole_content');


module.exports = {
  fields: {
    ApplyingForSomeone: 'input[id$="namedApplicant-2"]',
    ApplyingForYourself: 'input[id$="namedApplicant"]'
  },

  async DetermineApplicant(applyingForSomeone) {

    await I.wait(2);
    await I.see(DetermineRoleDetails.pageTitle);
    if(applyingForSomeone)
    {   
        await I.click(this.fields.ApplyingForSomeone);
    }
    else{
        await I.click(this.fields.ApplyingForYourself);
    }
    await I.wait(2);
    await I.click(DetermineRoleDetails.button);
    await I.wait('4');
  },
};
