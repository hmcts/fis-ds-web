
import { CourtListOptions } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isValidOption } from '../../../app/form/validation';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';


let courtListOptions: CourtListOptions[] = [];
courtListOptions = [
  {
      'epmsId': '231596',
      'site_name': 'Birmingham Civil and Family Justice Centre',
      'court_name': 'Birmingham Civil And Family Justice Centre'
  },
  {
      'epmsId': '88516',
      'site_name': 'Bradford Combined Court Centre',
      'court_name': 'Bradford Combined Court Centre'
  },
  {
      'epmsId': '298390',
      'site_name': 'Brighton County',
      'court_name': 'Brighton County And Family Court'
  },
  {
      'epmsId': '819890',
      'site_name': 'Bristol Civil and Family Justice Centre',
      'court_name': 'Bristol Civil And Family Justice Centre'
  },
  {
      'epmsId': '234850',
      'site_name': 'Cardiff Civil and Family Justice Centre',
      'court_name': 'Cardiff Civil And Family Justice Centre'
  },
  {
      'epmsId': '356855',
      'site_name': 'Central Family Court (First Avenue House)',
      'court_name': 'Central Family Court'
  },
  {
      'epmsId': '201339',
      'site_name': 'Derby Combined Court Centre',
      'court_name': 'Derby Combined Court Centre'
  },
  {
      'epmsId': '898213',
      'site_name': 'East London Family Court',
      'court_name': 'East London Family Court'
  },
  {
      'epmsId': '455174',
      'site_name': 'Leeds Combined Court Centre',
      'court_name': 'Leeds Combined Court Centre'
  },
  {
      'epmsId': '425094',
      'site_name': 'Leicester Combined Court',
      'court_name': 'Leicester Crown Court'
  },
  {
      'epmsId': '345663',
      'site_name': 'Liverpool Civil and Family Court',
      'court_name': 'Liverpool Civil And Family Court'
  },
  {
      'epmsId': '365554',
      'site_name': 'Luton Justice Centre',
      'court_name': 'Arndale House'
  },
  {
      'epmsId': '701411',
      'site_name': 'Manchester Civil Justice Centre (Civil and Family Courts)',
      'court_name': 'Manchester County And Family Court'
  },
  {
      'epmsId': '366796',
      'site_name': 'Newcastle Civil & Family Courts and Tribunals Centre',
      'court_name': 'Newcastle Civil And Family Courts And Tribunals Centre'
  },
  {
      'epmsId': '471332',
      'site_name': 'Norwich Combined Court Centre',
      'court_name': 'Norwich Combined Court Centre'
  },
  {
      'epmsId': '371016',
      'site_name': 'Oxford Combined Court Centre',
      'court_name': 'Oxford Combined Court Centre'
  },
  {
      'epmsId': '339463',
      'site_name': 'Plymouth Combined Court',
      'court_name': 'Plymouth Combined Court'
  },
  {
      'epmsId': '460592',
      'site_name': 'Portsmouth Combined Court Centre',
      'court_name': 'Portsmouth Combined Court Centre'
  },
  {
      'epmsId': '102476',
      'site_name': 'Preston Crown Court and Family Court (Sessions House)',
      'court_name': 'Preston Family Court'
  },
  {
      'epmsId': '185657',
      'site_name': 'Reading County Court and Family Court',
      'court_name': 'Reading County Court And Family Court'
  },
  {
      'epmsId': '20262',
      'site_name': 'Royal Courts of Justice',
      'court_name': 'Royal Courts of Justice - Queens Building (And West Green Building)'
  },
  {
      'epmsId': '232607',
      'site_name': 'Sheffield Combined Court Centre',
      'court_name': 'Sheffield Combined Court Centre'
  },
  {
      'epmsId': '195537',
      'site_name': 'Teesside Combined Court Centre',
      'court_name': 'Teesside Combined Court Centre'
  },
  {
      'epmsId': '373584',
      'site_name': 'West London Family Court',
      'court_name': 'West London Family Court'
  }
]

export const form: FormContent = {
  fields: () => {
    return {
      selectedCourt: {
        type: 'select',
        label: l => l.label,
        labelSize: null,
        validator: isValidOption,
        options: () => {
          const courtList = courtListOptions
            .filter(hearing => hearing?.site_name !== null && hearing?.site_name !== 'Royal Courts of Justice')
            .map(option => {
              const value = `${option.epmsId}`;
  
              return {
                value,
                text: `${option.court_name}`,
                selected: false,
              };
            });
  
          return courtList as [];
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
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
