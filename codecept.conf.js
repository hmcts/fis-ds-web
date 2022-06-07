require('./src/test/e2e/helpers/event_listener');
const lodash = require('lodash');

exports.config = {
  output: './output',
  multiple: {
    parallel: {
      chunks: files => {
        const splitFiles = (list, size) => {
          const sets = [];
          const chunks = list.length / size;
          let i = 0;

          while (i < chunks) {
            sets[i] = list.splice(0, size);
            i++;
          }
          return sets;
        };

        const buckets = parseInt(process.env.PARALLEL_CHUNKS || '1');
        const slowTests = lodash.filter(files, file => file.includes('@slow'));
        const otherTests = lodash.difference(files, slowTests);

        let chunks = [];
        if (buckets > slowTests.length + 1) {
          const slowTestChunkSize = 1;
          const regularChunkSize = Math.ceil((files.length - slowTests.length) / (buckets - slowTests.length));
          chunks = lodash.union(splitFiles(slowTests, slowTestChunkSize), splitFiles(otherTests, regularChunkSize));
        } else {
          chunks = splitFiles(files, Math.ceil(files.length / buckets));
        }

        console.log(chunks);

        return chunks;
      },
    },
  },
  helpers: {
    Puppeteer: {
      show: process.env.SHOW_BROWSER_WINDOW || false,
      waitForTimeout: parseInt(process.env.WAIT_FOR_TIMEOUT || '20000'),
      chrome: {
        ignoreHTTPSErrors: true,
        args: process.env.DISABLE_WEB_SECURITY === 'true' ? ['--disable-web-security'] : [],
        devtools: process.env.SHOW_BROWSER_WINDOW || false,
      },
      windowSize: '1280x960',
    },
    HooksHelper: {
      require: './src/test/e2e/helpers/hooks_helper.js',
    },
    BrowserHelpers: {
      require: './src/test/e2e/helpers/browser_helper.js',
    },
    DumpBrowserLogsHelper: {
      require: './src/test/e2e/helpers/dump_browser_logs_helper.js',
    },
    StepListener: {
      require: './src/test/e2e/helpers/stepListener.js',
    },
    Mochawesome: {
      uniqueScreenshotNames: true,
    },
  },

  include: {
    config: './src/test/e2e/config.js',
    I: './src/test/e2e/actors/main.js',
    loginPage: './src/test/e2e/pages/login.page.js',
    landingPage: './src/test/e2e/pages/LandingPage.js',
    familypage: './src/test/e2e/pages/Family.page.js',
    adoptionpage: './src/test/e2e/pages/Adoption.page.js',
    applytoapplicantpage: './src/test/e2e/pages/ApplytoApplicant.page.js',
    contactdetails: './src/test/e2e/pages/Contactdetails.page.js',
    addresswithpostcode: './src/test/e2e/pages/AddressWithPostCode.page.js',
    dateofbirth: './src/test/e2e/pages/DateOfBirth.page.js',
    uploadfilepage: './src/test/e2e/pages/UploadDocuments.page.js',
    reviewpaymentpage: './src/test/e2e/pages/ReviewPayment.page.js',
    statementoftruth: './src/test/e2e/pages/StatementOfTruth.page.js',
    determineapplicantrole:'./src/test/e2e/pages/DetermineApplicantRole.page.js',
    contactpreferencepage: './src/test/e2e/pages/ContactPreference.page.js',
    additionaldocumentpage: './src/test/e2e/pages/AdditionalDocuments.page.js'
  },
  plugins: {
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
      fullPageScreenshots: true,
    },
  },
  tests: './src/test/e2e/tests/*_test.js',
  teardownAll: require('./src/test/e2e/hooks/aggregate-metrics'),
  mocha: {
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: {
          steps: false,
        },
      },
      'mocha-junit-reporter': {
        stdout: '-',
        options: {
          mochaFile: 'test-results/result.xml',
        },
      },
      mochawesome: {
        stdout: '-',
        options: {
          reportDir: './output',
          inlineAssets: true,
          json: false,
        },
      },
      '../../src/test/e2e/reporters/json-file-reporter/reporter': {
        stdout: '-',
      },
    },
  },
};
