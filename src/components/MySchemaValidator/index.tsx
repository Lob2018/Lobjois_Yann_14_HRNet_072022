import joi from 'joi'

import REGEXUSDATE from '../../utils/regex/regexUSDate'
import REGEXTEXT from '../../utils/regex/regexText'
import REGEXTEXTANDNUMBERS from '../../utils/regex/regexTextAndNumbers'
import REGEXUSZIPCODES from '../../utils/regex/regexUSZipCodes'

const MySchemaValidator = joi
const schema = MySchemaValidator.object({
  city: MySchemaValidator.string()
    .pattern(REGEXTEXT)
    .optional()
    .allow(null, '')
    .max(255),
  dateOfBirth: MySchemaValidator.string()
    .pattern(REGEXUSDATE)
    .optional()
    .allow(null, ''),
  department: MySchemaValidator.string()
    .pattern(REGEXTEXTANDNUMBERS)
    .optional()
    .allow(null, '')
    .max(255),
  firstName: MySchemaValidator.string()
    .pattern(REGEXTEXT)
    .optional()
    .allow(null, '')
    .max(255),
  lastName: MySchemaValidator.string()
    .pattern(REGEXTEXT)
    .optional()
    .allow(null, '')
    .max(255),
  startDate: MySchemaValidator.string()
    .pattern(REGEXUSDATE)
    .optional()
    .allow(null, ''),
  state: MySchemaValidator.string()
    .pattern(REGEXTEXTANDNUMBERS)
    .optional()
    .allow(null, '')
    .max(255),
  street: MySchemaValidator.string()
    .pattern(REGEXTEXTANDNUMBERS)
    .optional()
    .allow(null, '')
    .max(255),
  zipCode: MySchemaValidator.string()
    .pattern(REGEXUSZIPCODES)
    .optional()
    .allow(null, '')
    .max(32),
})

export { schema }
