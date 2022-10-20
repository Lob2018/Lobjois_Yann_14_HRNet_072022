// regex for whitespace and accented characters (a-z A-Z, spaces, hyphens, and ISO Latin1 decimal code 192 à 383)
export const regexText = new RegExp(/^[a-zA-Z\u00C0-\u017F\s\\-]+$/)
//   // regex for whitespace and accented characters (a-z A-Z, spaces, hyphens, and ISO Latin1 decimal code 192 à 383) with numbers
export const regexTextAndNumbers = new RegExp(/^[a-zA-Z0-9\u00C0-\u017F\s\\-]+$/)
// regex for dates as MM/DD/YYYY
export const regexUSDate = new RegExp(
    /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/
  )
// regex for US zip codes as 12345 or 12345-6789
export const regexUSZipCodes = new RegExp(/^\d{5}(?:-\d{4})?$/)