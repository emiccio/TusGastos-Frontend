export type CountryOption = {
  code: string;
  name: string;
  dialCode: string;
};

export const LOGIN_COUNTRIES: CountryOption[] = [
  { code: 'AR', name: 'Argentina', dialCode: '54' },
  { code: 'UY', name: 'Uruguay', dialCode: '598' },
  { code: 'CL', name: 'Chile', dialCode: '56' },
  { code: 'BR', name: 'Brasil', dialCode: '55' },
  { code: 'MX', name: 'Mexico', dialCode: '52' },
  { code: 'US', name: 'Estados Unidos', dialCode: '1' },
  { code: 'ES', name: 'Espana', dialCode: '34' },
];

function cleanDigits(value: string): string {
  return value.replace(/\D/g, '');
}

export function normalizePhoneByCountry(countryCode: string, input: string): string {
  let digits = cleanDigits(input);

  if (!digits) return '';

  if (countryCode === 'AR') {
    if (digits.startsWith('54')) digits = digits.slice(2);
    if (digits.startsWith('0')) digits = digits.slice(1);
    if (digits.startsWith('15')) digits = digits.slice(2);
    if (digits.startsWith('9')) {
      return `54${digits}`;
    }
    return `549${digits}`;
  }

  if (countryCode === 'MX') {
    if (digits.startsWith('52')) digits = digits.slice(2);
    if (digits.startsWith('1')) digits = digits.slice(1);
    return `52${digits}`;
  }

  const selected = LOGIN_COUNTRIES.find((country) => country.code === countryCode);
  const dialCode = selected?.dialCode || '54';

  if (digits.startsWith(dialCode)) return digits;
  return `${dialCode}${digits}`;
}

export function formatPhoneForDisplay(phone: string): string {
  const digits = cleanDigits(phone);
  return digits ? `+${digits}` : '';
}
