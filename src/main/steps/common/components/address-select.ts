import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isAddressSelected } from '../../../app/form/validation';

const getAddressItems = addresses => addresses.map((item, index) => ({ text: item.fullAddress, value: index }));

const en = content => {
  const addresses = content.addresses || [];

  return {
    line1:
      "We'll send all court papers to this address unless you advise us that you are happy to be served with court orders by email.",
    postcode: 'Postcode',
    selectAddress: 'Select an address',
    cannotFindAddress: 'I cannot find the address in the list',
    defaultPostcode: 'E14RRR',
    enterAddressManually: 'Or enter address manually',
    errors: {
      selectAddress: {
        notSelected: 'Select an address',
      },
    },
    options: [
      {
        attributes: { id: 'totalAddressesFound' },
        value: -1,
        text: `${addresses?.length} address${addresses?.length !== 1 ? 'es' : ''} found`,
        selected: true,
      },
      ...getAddressItems(addresses),
    ],
    changePostCodeUrl: '#',
    cantFindAddressUrl: '#',
  };
};

const cy = content => {
  const addresses = content.addresses || [];

  return {
    line1:
      'Byddwn yn anfon holl bapurau’r llys i’r cyfeiriad hwn oni bai eich bod yn dweud wrthym eich bod yn hapus i orchmynion llys gael eu cyflwyno arnoch trwy e-bost.',
    postcode: 'God post',
    selectAddress: 'Dewiswch gyfeiriad',
    cannotFindAddress: 'Ni allaf ddod o hyd i’r cyfeiriad yn y rhestr',
    errors: {
      selectAddress: {
        notSelected: 'Dewiswch gyfeiriad',
      },
    },
    options: [
      {
        attributes: { id: 'totalAddressesFound' },
        value: -1,
        text: `${addresses.length} daethpwyd o hyd i gyfeiriad${addresses?.length !== 1 ? 'au' : ''}`,
        selected: true,
      },
      ...getAddressItems(addresses),
    ],
    changePostCodeUrl: '#',
    cantFindAddressUrl: '#',
  };
};

export const form: FormContent = {
  fields: {
    selectAddress: {
      type: 'select',
      label: l => l.selectAddress,
      labelSize: 'm',
      validator: isAddressSelected,
      options: l => l.options,
    },
  },
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
