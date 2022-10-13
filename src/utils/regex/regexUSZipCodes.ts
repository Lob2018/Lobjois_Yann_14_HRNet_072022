// regex for US zip codes as 12345 or 12345-6789
const regexUSZipCodes = new RegExp(/^\d{5}(?:-\d{4})?$/)
export default regexUSZipCodes
