const { I } = inject();

module.exports = {
  fields: {
    day: '#applicant1DateOfBirth-day',
    month: '#applicant1DateOfBirth-month',
    year: '#applicant1DateOfBirth-year',
  },
  async dateSelection(date, month, year) {
    await I.waitForText("What's your date of birth?", 30);
    await I.wait(2);
    await I.fillField(this.fields.day, date);
    await I.wait(2);
    await I.fillField(this.fields.month, month);
    await I.wait('2');
    await I.fillField(this.fields.year, year);
    await I.click('Save and continue');
    await I.wait('4');
  },
};