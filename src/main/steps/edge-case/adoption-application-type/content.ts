import { isFieldFilledIn } from '../../../app/form/validation';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = () => ({
  continue: 'Continue',
  serviceName:'Adoption',
  label: 'Select the type of adoption you want to apply for',
  one: 'International adoption',
  oneHint:'Application for an Adoption Order where the child ia habitually resident outside the British Islands and is brought into the United Kingdom for the purpose of adoption',
  two: 'Relinquished adoption',
  twoHint:'Application for an Adoption Order where the child is under 6 weeks old',
  three: 'Stepparent adoption',
  threeHint:"Application for an Adoption Order where you are applying to adopt alone and you are the partner (including spouse or civil partner) of the child's father or mother or other parent",
  four: 'Parental order',
  fourHint: 'Application to apply to become legal parents under Section 54 or 54A of the Human Fertilisation & Embryology Act 2008',
  errors: {
    applyingWith: {
      required: 'Select if any of the type of adoption you want to apply for',
    },
  },
});

const cy = () => ({
  continue: 'Continue (in welsh)',
  serviceName:'Adoption (in welsh)',
  label: 'Select the type of adoption you want to apply for (in welsh)',
  one: 'International adoption (in welsh)',
  oneHint: 'Application for an Adoption Order where the child ia habitually resident outside the British Islands and is brought into the United Kingdom for the purpose of adoption (in welsh)',
  two: 'Relinquished adoption (in welsh)',
  twoHint:'Application for an Adoption Order where the child is under 6 weeks old (in welsh)',
  three: 'Stepparent adoption (in welsh)',
  threeHint:"Application for an Adoption Order where you are applying to adopt alone and you are the partner (including spouse or civil partner) of the child's father or mother or other parent (in welsh)",
  four: 'Parental order (in welsh)',
  fourHint:'Application to apply to become legal parents under Section 54 or 54A of the Human Fertilisation & Embryology Act 2008 (in welsh)',
  errors: {
    applyingWith: {
      required: 'Select if any of the type of adoption you want to apply for (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    applyingWith: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      values: [
        { label: l => l.one, value: 'internationalAdoption',hint:l =>l.oneHint},
        { label: l => l.two, value: 'relinquishedAdoption',hint:l =>l.twoHint },
        { label: l => l.three, value: 'stepParentAdoption',hint:l =>l.threeHint },
        { label: l => l.four, value: 'parentalOrders',hint:l =>l.fourHint },
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
