// regex for whitespace and accented characters (a-z A-Z, spaces, hyphens, and ISO Latin1 decimal code 192 à 383)
const regexText = new RegExp(/^[a-zA-Z\u00C0-\u017F\s\\-]+$/)
export default regexText
