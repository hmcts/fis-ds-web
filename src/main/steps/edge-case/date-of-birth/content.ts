import { CaseDate } from '../../../app/case/case';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { covertToDateObject } from '../../../app/form/parser';
import { isDateInputInvalid, isFutureDate } from '../../../app/form/validation';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';
import { TranslationFn } from '../../../app/controller/GetController';

export const form: FormContent = {
  fields: () => {
    return {
      applicant1DateOfBirth: {
        type: 'date',
        classes: 'govuk-date-input',
        label: l => l.title,
        labelHidden: true,
        hint: l => l.hint,
        values: [
          {
            label: l => l.dateFormat['day'],
            name: 'day',
            classes: 'govuk-input--width-2',
            attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
          },
          {
            label: l => l.dateFormat['month'],
            name: 'month',
            classes: 'govuk-input--width-2',
            attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
          },
          {
            label: l => l.dateFormat['year'],
            name: 'year',
            classes: 'govuk-input--width-4',
            attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
          },
        ],
        parser: body => covertToDateObject('applicant1DateOfBirth', body as Record<string, unknown>),
        validator: value => isDateInputInvalid(value as CaseDate) || isFutureDate(value as CaseDate),
      },
    };
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const resourceLoader = new ResourceReader();
  resourceLoader.Loader('date-of-birth/translation.json');
  const Translations = resourceLoader.getFileContents().translations;

  const en = () => {
    return {
      ...Translations.en,
      errors: {
        applicant1DateOfBirth: {
          required: 'Enter your date of birth',
          invalidDate: 'Date of birth must be a real date',
          incompleteDay: 'Your date of birth must include a day',
          incompleteMonth: 'Your date of birth must include a month',
          incompleteYear: 'Your date of birth must include a year',
          invalidDateInFuture: 'Your date of birth must be in the past',
        },
      },
    };
  };
  const cy = () => {
    return {
      ...Translations.cy,
      errors: {
        applicant1DateOfBirth: {
          required: 'Enter your date of birth (in Welsh)',
          invalidDate: 'Date of birth must be a real date (in Welsh)',
          incompleteDay: 'Your date of birth must include a day (in Welsh)',
          incompleteMonth: 'Your date of birth must include a month (in Welsh)',
          incompleteYear: 'Your date of birth must include a year (in Welsh)',
          invalidDateInFuture: 'Your date of birth must be in the past (in Welsh)',
        },
      },
    };
  };

  const languages = {
    en,
    cy,
  };
  const translations = languages[content.language]();
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};