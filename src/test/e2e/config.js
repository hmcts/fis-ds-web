module.exports = {
  citizenUserOne: {
    email: process.env.CITIZEN_USERNAME,
    password: process.env.CITIZEN_PASSWORD,
  },

  baseUrl: process.env.DS_UI_URL || 'https://ds-ui.aat.platform.hmcts.net/'
};
