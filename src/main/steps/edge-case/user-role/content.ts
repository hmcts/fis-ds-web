import { CaseWithId } from 'app/case/case';
import { TYPE_OF_APPLICATION, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';

const USER_ROLE = 'user-role';

export const form: FormContent = {
  fields: (caseData: Partial<CaseWithId>) => {
    const fieldConfig = {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      selected: false,
      values: [
        { label: l => l.one, value: YesOrNo.YES },
        { label: l => l.two, value: YesOrNo.NO },
        { label: l => l.three, value: YesOrNo.NO },
      ],
      validator: isFieldFilledIn,
    };

    if ([TYPE_OF_APPLICATION.PARENTAL_ORDER, TYPE_OF_APPLICATION.DECLARATION_OF_PARENTAGE, TYPE_OF_APPLICATION.SPECIAL_GUARDIANSHIP_ORDER].includes(caseData.edgeCaseTypeOfApplication!)) {
      fieldConfig.values.splice(1, 1);
    }

    return {
      namedApplicant: fieldConfig,
    };
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
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}, content.additionalData?.req) },
  };
};
