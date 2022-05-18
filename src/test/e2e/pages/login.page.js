const config = require('../config');
const { I } = inject();

module.exports = {
  fields: {
    username: '#username',
    password: '#password',
  },
  submitButton: 'input[value="Sign in"]',

  async SignInUser() {
    I.wait(5);
    await I.fillField(this.fields.username, config.citizenUserOne.email);
    await I.fillField(this.fields.password, config.citizenUserOne.password);
    I.wait(5)
    await I.click(this.submitButton);
  },
};
