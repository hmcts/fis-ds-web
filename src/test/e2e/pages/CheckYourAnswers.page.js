const { I } = inject();
const config = require('../config.js');

module.exports = {
async checkyouranswers() {
    await I.waitForText("Check your Answers", 30);
    await I.wait(3);
    I.click('Continue');
    await I.wait(5);
},
};