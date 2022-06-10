const { I } = inject();

module.exports = {
  fields: {
    homenumber: 'input[id$="homePhoneNumber"]',
    mobilenumber: 'input[id$="mobilePhoneNumber"]'
  },
    EnterHomeAndMobileNo( homeNumber , mobileNumber ) {
        I.waitForText('What is the home phone number of the person named on the application?');
        I.waitForText('What is the mobile phone number of the person named on the application?');
        I.fillField(this.fields.homenumber, homeNumber );
        I.fillField(this.fields.mobilenumber, mobileNumber );
        I.click('Save and Continue')
        I.wait(5);
    },
};
