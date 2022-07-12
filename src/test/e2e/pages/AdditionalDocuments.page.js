const { I } = inject();
const config = require('../config.js');
const AdditionalDocumentsDetails = require('../fixtures/content/AdditionalDocuments_content');

module.exports = {
  fields: {
    uploadFileButton: 'input[id$="file-upload-1"]',
    uploadProgressBar: '#uploadProgressBar div[aria-hidden="true"]',
    fileUploadedOption: 'button[type="upload document"]',
  },

async uploadDocumentsSection() {
    await I.waitForText(AdditionalDocumentsDetails.pageTitle, 30);
    await I.see(AdditionalDocumentsDetails.textonpage1);
    await I.see(AdditionalDocumentsDetails.textonpage2);
    await I.see(AdditionalDocumentsDetails.textonpage3);
    await I.see(AdditionalDocumentsDetails.hintText);
    await I.attachFile(this.fields.uploadFileButton, config.testPdfFile);
    await I.wait(3);
    await I.retry(3).waitForElement(this.fields.fileUploadedOption, 30);
    I.click(this.fields.fileUploadedOption);
    await I.wait(4);
    I.click(AdditionalDocumentsDetails.button);
  },
};
