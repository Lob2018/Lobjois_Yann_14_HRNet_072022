import joi from 'joi'

import {
  regexUSDate,
  regexText,
  regexTextAndNumbers,
  regexUSZipCodes,
} from '../../utils/regex'

const MySchemaValidator = joi
const schema = MySchemaValidator.object({
  city: MySchemaValidator.string()
    .pattern(regexText)
    .optional()
    .allow(null, '')
    .max(255),
  dateOfBirth: MySchemaValidator.string()
    .pattern(regexUSDate)
    .optional()
    .allow(null, ''),
  department: MySchemaValidator.string()
    .pattern(regexTextAndNumbers)
    .optional()
    .allow(null, '')
    .max(255),
  firstName: MySchemaValidator.string()
    .pattern(regexText)
    .optional()
    .allow(null, '')
    .max(255),
  lastName: MySchemaValidator.string()
    .pattern(regexText)
    .optional()
    .allow(null, '')
    .max(255),
  startDate: MySchemaValidator.string()
    .pattern(regexUSDate)
    .optional()
    .allow(null, ''),
  state: MySchemaValidator.string()
    .pattern(regexTextAndNumbers)
    .optional()
    .allow(null, '')
    .max(255),
  street: MySchemaValidator.string()
    .pattern(regexTextAndNumbers)
    .optional()
    .allow(null, '')
    .max(255),
  zipCode: MySchemaValidator.string()
    .pattern(regexUSZipCodes)
    .optional()
    .allow(null, '')
    .max(32),
})

export { schema }
