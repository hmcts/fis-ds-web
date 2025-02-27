import { UserRole } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';
const USER_ROLE = 'user-role';

export const form: FormContent = {
  fields: {
    whomYouAreApplying: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      selected: false,
      values: [
        { label: l => l.self, value: UserRole.SELF },
        { label: l => l.forSomeone, value: UserRole.FOR_SOMEONE },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const resourceLoader = new ResourceReader();
  resourceLoader.Loader(USER_ROLE);
  const translations = resourceLoader.getFileContents().translations;
  const errors = resourceLoader.getFileContents().errors;

  const en = () => {
    return {
      ...translations.en,
      errors: {
        ...errors.en,
      },
    };
  };
  const cy = () => {
    return {
      ...translations.cy,
      errors: {
        ...errors.cy,
      },
    };
  };

  const languages = {
    en,
    cy,
  };
  const translationContent = languages[content.language]();
  return {
    ...translationContent,
    form,
  };
};
