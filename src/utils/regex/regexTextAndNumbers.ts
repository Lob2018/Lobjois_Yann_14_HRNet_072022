//   // regex for whitespace and accented characters (a-z A-Z, spaces, hyphens, and ISO Latin1 decimal code 192 à 383) with numbers
const regexTextAndNumbers = new RegExp(/^[a-zA-Z0-9\u00C0-\u017F\s\\-]+$/)
export default regexTextAndNumbers
