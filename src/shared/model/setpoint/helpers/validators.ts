export const isValidInt = (value: string) => /^-?\d*$/.test(value);
export const isValidFloat = (value: string) => /^-?\d*[.,]?\d*$/.test(value);
