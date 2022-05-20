import { isObject } from 'lodash';

import { Checkbox } from '../../../app/case/case';
import { DocumentType } from '../../../app/case/definition';
import { TranslationFn} from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { ValidationError, atLeastOneFieldIsChecked } from '../../../app/form/validation';
//import {ResourceReader} from '../../../modules/resourcereader/ResourceReader'





export const form: FormContent = {
  fields: userCase => {
    const checkboxes: { id: string; value: DocumentType }[] = [];

    checkboxes.push({
      id: 'birthOrAdoptionCertificate',
      value: DocumentType.BIRTH_OR_ADOPTION_CERTIFICATE,
    });

    checkboxes.push({
      id: 'deathCertificate',
      value: DocumentType.DEATH_CERTIFICATE,
    });

    return {
      applicant1UploadedFiles: {
        type: 'hidden',
        label: l => l.uploadFiles,
        labelHidden: true,
        value:
          (isObject(userCase.applicant1UploadedFiles)
            ? JSON.stringify(userCase.applicant1UploadedFiles)
            : userCase.applicant1UploadedFiles) || '[]',
        parser: data => JSON.parse((data as Record<string, string>).applicant1UploadedFiles || '[]'),
        validator: (value, formData) => {
          const hasUploadedFiles = (value as string[])?.length && (value as string) !== '[]';
          const selectedCannotUploadDocuments =
            formData.applicant1CannotUpload && !!formData.applicant1CannotUploadDocuments?.length;
          if (!hasUploadedFiles && !selectedCannotUploadDocuments) {
            return ValidationError.NOT_UPLOADED;
          }
          const fileArray = JSON.parse((formData as Record<string, string>).applicant1UploadedFiles || '[]');
          if (Object.keys(fileArray).length > 10) {
            return ValidationError.FILE_COUNT_LIMIT_EXCEEDED;
          }
        },
      },
      documentUploadProceed: {
        type: 'hidden',
        label: l => l.uploadFiles,
        labelHidden: true,
        value: 'true',
      },
      applicant1CannotUpload: {
        type: 'checkboxes',
        label: l => l.cannotUploadDocuments,
        labelHidden: true,
        //validator: (value, formData) => isValidCannotUpload(value, formData),
        validator: (value, formData) => {
          if ((value as string[])?.includes(Checkbox.Checked)) {
            return atLeastOneFieldIsChecked(formData?.applicant1CannotUploadDocuments);
          }
        },
        values: [
          {
            name: 'applicant1CannotUpload',
            label: l => l.cannotUploadDocuments,
            value: Checkbox.Checked,
            subFields: {
              applicant1CannotUploadDocuments: {
                type: 'checkboxes',
                label: l => l.cannotUploadWhich,
                hint: l => l.checkAllThatApply,
                values: checkboxes.map(checkbox => ({
                  name: 'applicant1CannotUploadDocuments',
                  label: l => l[checkbox.id],
                  value: checkbox.value,
                })),
                subtext: l => l.cannotUploadYouCanPost,
              },
            },
          },
        ],
      },
    };
  },
  submit: {
    text: l => l.continue,
  },
  saveAsDraft: {
    text: l => l.saveAsDraft,
  },
};

/**
 * 
 * @returns 
 * const SystemTranslation = async()=> {
  return await new ResourceReader().Loader('upload-your-documents/translation.yml');
}

 */




export const generateContent: TranslationFn =   (content) => {

 //let SystemLanguage =  (new ResourceReader().Loader('upload-your-documents/translation.yml'));

  const en = ()=> { 
    return {}
  
  };
  const cy = ()=> {
    return {}
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


  
  

  
 // 
  
  
};