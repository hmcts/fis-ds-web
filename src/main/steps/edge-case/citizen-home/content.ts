import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

// import { FormContent } from "app/form/Form";

export const en = (): Record<string, unknown> => ({
    jurisdication: 'Jurisdication',
    appType: 'Application Type',
    items1:[{text:'Family', value:'1'}, {text:'Tribunals', value:'2'}],
    items2:[{text:'International Aoption', value:'1'}, {text:'Relinquished Adoption', value:'2'}, , {text:'Special Guardianship', value:'3'}]
});

export const cy = (): Record<string, unknown> => ({
    jurisdication: 'Jurisdication',
    appType: 'Application Type'
});

export const form: FormContent = {
    fields: {
        citizenJurisdication: {
            type: 'select',
            label: l => l.jurisdication,
            labelSize: 'normal',
            options: it => it.items1,
        },
        citizenApplicationType: {
            type: 'select',
            label: l => l.appType,
            labelSize: 'normal',
            options: it => it.items2,
        }
    }, 
    submit: {
        text: l => l.next,
      },
}

const languages = {
    en,
    cy,
  };
  
  export const generateContent: TranslationFn = content => ({
    ...languages[content.language](),
    form,
  });