import { Case } from '../case';

/**
 * It takes a partial object of type Case and returns a string
 * @param data - Partial<Case>
 * @returns A string
 */
export const getFormattedAddress = (data: Partial<Case>): string => {
  let address: string[] = [];
  address.push(data['applicantAddress1'] || '');
  address.push(data['applicantAddress2'] || '');
  address.push(data['applicantAddress3'] || '');
  address.push(data['applicantAddressTown'] || '');
  address.push(data['applicantAddressCounty'] || '');
  address.push(data['applicantAddressPostcode'] || '');
  address.push(data['applicantAddressCountry'] || '');

  //remove empty items
  address = address.filter(item => !!item);

  /* Joining the array with a <br> tag. */
  return address.join('<br>');
};
