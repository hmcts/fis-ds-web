const { I } = inject();

module.exports = {
  fields: {
    emailyes: 'input[id$="emailAddressConsent"]',
    emailno: 'input[id$="emailAddressConsent"]',
    emailAddress: 'input[id$="emailAddress"]',
    homenumber: 'input[id$="homePhoneNumber"]',
    mobilenumber: 'input[id$="mobilePhoneNumber"]',
  },

  async seeTheTitleOfThePage() {
    I.wait('10');
    await I.see('What are your contact details?');
  },

    selectEmail() {
      I.click(this.fields.emailyes) 
      I.wait(5);
      I.see('Your email address');
      I.fillField(this.fields.emailAddress, "hello@abc.com");
      I.click('Continue')
      I.wait(5);
    },
  
    selecthomenumber() {
      I.fillField(this.fields.homenumber, "1234567890");
      I.click('Continue')
      I.wait(5);
    },

    selecthomenumber() {
        I.fillField(this.fields.mobilenumber, "1234567890");
        I.click('Continue')
        I.wait(5);
    },
};
