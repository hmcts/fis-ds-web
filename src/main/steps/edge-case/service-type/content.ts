import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  continue: 'Continue',
  cancel: 'Cancel',
  label: 'Select type of family law you need',
  one: 'Adoption',
  two: 'Private Law',
  hint: 'Select either adoption or private law. There are specific examples under each section',
  serviceName: 'Family',
  errors: {
    serviceType: {
      required: 'Select the Service type',
    },
  },
});

const cy = () => ({
  continue: 'Continue (in welsh)',
  label: 'Service Type (in welsh)',
  one: 'Adoption (in welsh)',
  two: 'Private Law (in welsh)',
  hint: 'Select either adoption or private law. There are specific examples under each section (in welsh)',
  applyForDissolution: 'Family (in welsh)',
  applyForAdoption: 'Family (in welsh)',
  serviceName: 'Family (in welsh)',
  errors: {
    serviceType: {
      required: 'Select the Service type (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    serviceType: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      hint: h => h.hint,
      values: [
        {
          label: l => l.one,
          value: 'adoption',
          subFields: {
            internationalAdoption: {
              type: 'label',
              label: 'International Adoption',
            },
            relinquishedAdoption: {
              type: 'label',
              label: 'Relinquished adoption',
            },
            stepparentAdoption: {
              type: 'label',
              label: 'Stepparent Adoption',
            },
            parentalOrders: {
              type: 'label',
              label: 'Parental orders',
            },
          },
        },
        {
          label: l => l.two,
          value: 'privateLaw',
          subFields: {
            femaleGenitalMutilationOrdersFGM: {
              type: 'label',
              label: 'Female Genital Mutilation Orders(FGM)',
            },
            forcedProtectionMarriageOrderFMPO: {
              type: 'label',
              label: 'Forced Marriage Protection Order(FMPO)',
            },
            specialGuardianship: {
              type: 'label',
              label: 'Special Guardianship',
            },
            financialApplications: {
              type: 'label',
              label: 'Financial Applications',
            },
            declarationOfParentage: {
              type: 'label',
              label: 'Declaration of parentage',
            },
          },
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.continue,
  },
  cancel: {
    text: l => l.cancel,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
