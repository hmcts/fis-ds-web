const { I } = inject();

module.exports = {
  fields: {
    paybycard: 'input[id$="paymentType"]',
    paybyreference: 'input[id$="paymentType-2"]',
    paywithhelp: 'input[id$="paymentType-3"]',
    referencenum: 'input[id$=: ="hwfRefNumber"]',
  },

  async seeTheTitleOfThePage() {
    I.wait('2');
    await I.see('Review your application, pay and send');

    if (I.see('Paying your International adoption application court fees')) {
    I.see('The application court fees total £183.');
    }

    else if (I.see('Paying your Relinquished adoption application court fees')) {
    I.see('The application court fees total £183.');
    }

    else if (I.see('Paying your Stepparent Adoption application court fees')) {
    I.see('The application court fees total £183.');
    }

    else if (I.see('Paying your Parental orders application court fees')) {
    I.see('The application court fees total £232.');
    }

    else if (I.see('Paying your Female Genital Mutilation Orders(FGM) application court fees')) {
    I.see('The application court fees total £0.');
    }

    else if (I.see('Paying your Forced Marriage Protection Order(FMPO) application court fees')) {
    I.see('The application court fees total £0.');
    }

    else if (I.see('Paying your Special Guardianship application court fees')) {
    I.see('The application court fees total £232.');
    }

    else if (I.see('Paying your Financial Applications application court fees')) {
     I.see('The application court fees total £183.');
    }

    else if (I.see('Paying your Declaration of parentage application court fees')) {
     I.see('The application court fees total £365.');
    };

    I.see('If you have little or no savings, receive certain benefits or have a low income you may be able to get help with your application fees.');
  },

    selectPayByCard() {
      I.click(this.fields.paybycard);
      I.wait(5);
      I.click('Save and continue');
    },

    selectPayByReference() {
        I.click(this.fields.paybyreference);
        I.wait(5);
        I.see('Enter your help with fees reference number');
        I.fillField(this.fields.referencenum, "12345ASDF");
        I.click('Save and continue');
      },

      selectPayWithHelp() {
        I.click(this.fields.paywithhelp);
        I.wait(5);
        I.click('Save and continue');
      },
};