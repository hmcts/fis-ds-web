import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { isValidOption } from '../../../app/form/validation';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';
import { CaseWithId } from '../../../app/case/case';
import { AppRequest } from '../../../app/controller/AppRequest';
export * from './routeGuard';

export const form: FormContent = {
  fields: (userCase: Partial<CaseWithId>, req: AppRequest): FormFields => {
    return {
      selectedCourtId: {
        type: 'select',
        label: l => l.label,
        labelSize: null,
        validator: isValidOption,
        options: () => {
          const courts = [...req.session.applicationSettings.availableCourts].map(court => ({
            value: court.id,
            text: court.name,
            selected: userCase?.selectedCourtId === court.id,
          }));

          courts?.unshift({
            text: '-- Select a value --',
            value: '',
            selected: !userCase?.selectedCourtId,
          });

          return courts as [];
        },
      },
    };
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const resourceLoader = new ResourceReader();
  resourceLoader.Loader('select-court');
  const translations = resourceLoader.getFileContents();

  return {
    ...translations?.translations?.[content.language],
    errors: {
      ...translations?.errors?.[content.language],
    },
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}, content.additionalData?.req) },
  };
};
