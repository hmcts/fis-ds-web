const { I } = inject();

module.exports = {
  fields: {
    PostCode: '#applicant1AddressPostcode',
    Submit: '#main-form-submit',
    addressList: 'select[id$="applicant1SelectAddress"]',
    lookupOption: '3, COPSE CLOSE, FLEET, GU51 1FA'
  },

    PostCodeLookUpAndSelect() {
        I.waitForText("What's your home address?");
        I.see('Postcode');
        I.see("We'll send all court papers to this address unless you advise us that you are happy to be served court orders by email.");
        I.fillField(this.fields.PostCode, 'GU51 1FA');
        I.wait('2');
        I.click(this.fields.Submit);
        I.wait('2');
        I.waitForText("Select an address");
        I.selectOption(this.fields.addressList, this.fields.lookupOption);
        I.click('Save and Continue');
        I.wait('2');
    }
};