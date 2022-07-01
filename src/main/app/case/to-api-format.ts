import { Case, CaseDate, formFieldsToCaseMapping, formatCase } from './case';
import { CaseData } from './definition';

/**
 * OrNull<T> is a type that is the same as T, except that all of its properties are nullable.
 * @property {T[K] | null} [: T[K] | null] - This is the type of the property. It's the same as the
 * type of the property in the original type, but with the addition of null.
 */
export type OrNull<T> = { [K in keyof T]: T[K] | null };

type ToApiConverters = Partial<Record<keyof Case, string | ((data: Case) => OrNull<Partial<CaseData>>)>>;

/* Taking the formFieldsToCaseMapping object and adding it to the fields object. */
export const fields: ToApiConverters = {
  ...formFieldsToCaseMapping,
};

export const toApiFormat = (data: Partial<Case>): CaseData => formatCase(fields, data);
/**
 * It takes a CaseDate object and returns a string in the format YYYY-MM-DD
 * @param {CaseDate | undefined} date - CaseDate | undefined
 * @returns A string
 */

export const toApiDate = (date: CaseDate | undefined): string => {
  if (!date?.year || !date?.month || !date?.day) {
    return '';
  }
  /* Taking the date object and returning a string in the format YYYY-MM-DD */
  return date.year + '-' + date.month.padStart(2, '0') + '-' + date.day.padStart(2, '0');
};
