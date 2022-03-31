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
        I.see('Application for an Adoption Order where the child ia habitually resident outside the British Islands and is brought into the United Kingdom for the purpose of adoption')
        I.click(this.fields.internationaladoption);
        I.wait('2');
        I.click('Continue');
    },

    selectRelinquishedAdoption() {
        I.waitForText("Select the type of adoption you want to apply for");
        I.see('Application for an Adoption Order where the child is under 6 weeks old')
        I.click(this.fields.relinquishedadoption);
        I.wait('2');
        I.click('Continue');
    },

    selectStepparentAdoption() {
        I.waitForText("Select the type of adoption you want to apply for");
        I.see("Application for an Adoption Order where you are applying to adopt alone and you are the partner (including spouse or civil partner) of the child's father or mother or other parent")
        I.click(this.fields.stepparentadoption);
        I.wait('2');
        I.click('Continue');
    },

    selectParentalOrder() {
        I.waitForText("Select the type of adoption you want to apply for");
        I.see('Application to apply to become legal parents under Section 54 or 54A of the Human Fertilisation & Embryology Act 2008')
        I.click(this.fields.parentalorder);
        I.wait('2');
        I.click('Continue');
    },
};