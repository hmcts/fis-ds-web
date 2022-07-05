const { I } = inject();

module.exports = {
  fields: {
    internationaldss: '#applyingWithdss',
    relinquisheddss: '#applyingWithdss-2',
    stepparentdss: '#applyingWithdss-3',
    parentalorder: '#applyingWithdss-4',
  },

    selectInternationaldss() {
        I.waitForText("Select the type of dss you want to apply for");
        I.see('Application for an dss Order where the child ia habitually resident outside the British Islands and is brought into the United Kingdom for the purpose of dss')
        I.click(this.fields.internationaldss);
        I.wait('2');
        I.click('Continue');
    },

    selectRelinquisheddss() {
        I.waitForText("Select the type of dss you want to apply for");
        I.see('Application for an dss Order where the child is under 6 weeks old')
        I.click(this.fields.relinquisheddss);
        I.wait('2');
        I.click('Continue');
    },

    selectStepparentdss() {
        I.waitForText("Select the type of dss you want to apply for");
        I.see("Application for an dss Order where you are applying to adopt alone and you are the partner (including spouse or civil partner) of the child's father or mother or other parent")
        I.click(this.fields.stepparentdss);
        I.wait('2');
        I.click('Continue');
    },

    selectParentalOrder() {
        I.waitForText("Select the type of dss you want to apply for");
        I.see('Application to apply to become legal parents under Section 54 or 54A of the Human Fertilisation & Embryology Act 2008')
        I.click(this.fields.parentalorder);
        I.wait('2');
        I.click('Continue');
    },
};