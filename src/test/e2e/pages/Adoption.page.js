const { I } = inject();

module.exports = {
  fields: {
    internationaladoption: 'input[id$="applyingWith"]',
    relinquishedadoption: 'input[id$="applyingWith-2"]',
    stepparentadoption: 'input[id$="applyingWith-3"]',
    parentalorder: 'input[id$="applyingWith-4"]',
  },

    selectInternationalAdoption() {
        I.waitForText("Select the type of adoption you want to apply for");
        I.click(this.fields.internationaladoption);
        I.wait('2');
        I.click('Continue');
    },

    selectRelinquishedAdoption() {
        I.waitForText("Select the type of adoption you want to apply for");
        I.click(this.fields.relinquishedadoption);
        I.wait('2');
        I.click('Continue');
    },

    selectStepparentAdoption() {
        I.waitForText("Select the type of adoption you want to apply for");
        I.click(this.fields.stepparentadoption);
        I.wait('2');
        I.click('Continue');
    },

    selectParentalOrder() {
        I.waitForText("Select the type of adoption you want to apply for");
        I.click(this.fields.parentalorder);
        I.wait('2');
        I.click('Continue');
    },
};