/* eslint-disable jest/expect-expect */
import { YesNoNotsure } from '../../../../app/case/definition';
import { languageAssertions } from '../../test/languageAssertions';

import { Radios } from './radios';

const fieldName = 'birthFatherNameOnCertificate';

const enContent = {
  section: 'Section',
  label: "Is the birth father's name on the birth certificate?",
  hint: "Ask the adoption agency or social worker if you're not sure.",
  yes: 'Yes',
  no: 'No',
  unsure: 'Not sure',
  continue: 'Save and continue',
  saveAsDraft: 'Save as draft',
};

const cyContent = {
  section: 'Adran',
  label: 'A yw enw’r tad biolegol ar y dystysgrif geni?',
  hint: 'Gofynnwch i’r asiantaeth fabwysiadu neu’r gweithiwr cymdeithasol os nad ydych yn siŵr.',
  yes: 'Ydw',
  no: 'Nac ydw',
  unsure: 'Ddim yn siŵr',
  continue: 'Cadw ac Parhau',
  saveAsDraft: 'Cadw fel drafft',
};

const values = [
  { key: 'yes', value: YesNoNotsure.YES },
  { key: 'no', value: YesNoNotsure.NO },
  { key: 'unsure', value: YesNoNotsure.NOT_SURE },
];

const { generateContent } = new Radios({
  enContent,
  cyContent,
  fieldName,
  values,
  label: 'label',
  hint: 'hint',
});

describe('steps > common > component', () => {
  it('should return correct English content', () => {
    languageAssertions('en', enContent, generateContent);
  });

  it('should return correct Welsh content', () => {
    languageAssertions('cy', cyContent, generateContent);
  });
});
