const { I } = inject();

module.exports = {
  fields: {
    day: '#applicantDateOfBirth-day',
    month: '#applicantDateOfBirth-month',
    year: '#applicantDateOfBirth-year',
  },
  async dateSelection(date, month, year) {
    await I.waitForText("What is the date of birth of the person named on this application?", 30);
    await I.wait(2);
    await I.fillField(this.fields.day, date);
    await I.wait(2);
    await I.fillField(this.fields.month, month);
    await I.wait('2');
    await I.fillField(this.fields.year, year);
    await I.click('Continue');
    await I.wait('4');
  },
};