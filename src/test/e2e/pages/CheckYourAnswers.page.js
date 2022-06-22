const { I } = inject();
const config = require('../config.js');

module.exports = {
async checkyouranswers() {
    await I.waitForText("Check your Answers", 30);
    await I.wait(3);
    await I.see('Now submit your appeal');
    await I.wait(3);
    await I.see('By submitting this appeal you are confirming that, to the best of your knowledge, the details you are providing are correct.');
    I.click('Accept and Send');
    await I.wait(5);
},
};