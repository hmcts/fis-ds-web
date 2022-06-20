const { I } = inject();
module.exports = {
  fields: {
    emailaddress: '#applicantEmailAddress',
  },
  async emailAddress() {
    await I.wait(2);
    await I.see('What is the email address of the person named on the application?');
    I.fillField(this.fields.emailaddress, 'abdsf2242cd@de23f.com');
    await I.wait(2);
    await I.click('Continue');
  },
};
