import { lazy, useState } from 'react'

import styled from 'styled-components'

import { useForm } from 'react-hook-form'

import employeesService from '../../components/services/employees.service'

import { useDispatch } from 'react-redux'
import * as loadingActions from '../../features/loading'
import * as employeesActions from '../../features/employees'
import * as modalCreateEmployeeActions from '../../features/modalCreateEmployee'

import Employee from '../../classes/employee.class'

import Dropdown from 'react-dropdown-component-library'
import STATES from '../../data/states'
import DEPARTMENTS from '../../data/departments'

import REGEXUSDATE from '../../utils/regex/regexUSDate'
import REGEXTEXT from '../../utils/regex/regexText'
import REGEXTEXTANDNUMBERS from '../../utils/regex/regexTextAndNumbers'
import REGEXUSZIPCODES from '../../utils/regex/regexUSZipCodes'
import DATEFORMATMMDDYYYY from '../../utils/date/formatMMDDYYYY'

const MyDatePicker = lazy(() => import('../../components/MyDatePicker'))
const MyModal = lazy(() => import('../../components/MyModal'))

const SectionContainer = styled.section`
  box-sizing: border-box;
  background-color: white;
  width: 350px;
  margin: 3rem auto;
  padding: 2rem;
  @media (max-width: 480px) {
    width: calc(100vw / 1.2);
    margin: 0rem auto;
  }
`

const StyledH1 = styled.h1`
  margin-bottom: 2rem;
  font-size: 2em;
  @media (max-width: 480px) {
    margin-top: 0px;
    font-size: 1.5em;
  }
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 1rem;
  label {
    font-weight: bold;
  }
  input {
    padding: 5px;
    font-size: 1.2rem;
  }
`

const StyledErrors = styled.p`
  color: #d93025;
  font-size: 12px;
  margin: 6px 0 0 0;
`
const StyledAccountError = styled.p`
  color: #d93025;
  font-size: 12px;
  margin: 16px 0 0 0;
`

function Home() {
  const dispatch = useDispatch()

  // dateOfBirthPicker with controls
  const [dateOfBirthPicker, setDateOfBirthPicker] = useState(new Date())
  const handleDateOfBirthSelected = (value: Date) => {
    if (
      value.toLocaleDateString('en-US', DATEFORMATMMDDYYYY).match(REGEXUSDATE)
    ) {
      clearErrors('dateOfBirth')
    } else setError('dateOfBirth', {})
    setDateOfBirthPicker(value ? value : new Date())
  }

  // startDatePicker with controls
  const [startDatePicker, setStartDatePicker] = useState(new Date())
  const handleStartDateSelected = (value: Date) => {
    if (
      value.toLocaleDateString('en-US', DATEFORMATMMDDYYYY).match(REGEXUSDATE)
    ) {
      clearErrors('startDate')
    } else setError('startDate', {})
    setStartDatePicker(value ? value : new Date())
  }

  // state dropdown with controls
  const [stateValue, setStateValue] = useState('')
  const handleStateDropdown = (value: string) => {
    if (value.length >= 255 || !value.match(REGEXTEXTANDNUMBERS)) {
      setError('state', {})
    } else clearErrors('state')
    setStateValue(value ? value : '')
  }

  // department dropdown with controls
  const [departmentValue, setDepartmentValue] = useState('')
  const handleDepartmentDropdown = (value: string) => {
    if (value.length >= 255 || !value.match(REGEXTEXTANDNUMBERS)) {
      setError('department', {})
    } else clearErrors('department')
    setDepartmentValue(value ? value : '')
  }

  // message for invalid credentials
  const [isValidAccount, setAccountValidity] = useState(true)
  const checkAccountValidity = (b: boolean) => {
    setAccountValidity(b)
  }
  // check form's errors
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data: Record<string, string>) => {
    const city = data.city || ''
    const dateOfBirth =
      dateOfBirthPicker.toLocaleDateString('en-US', DATEFORMATMMDDYYYY) || ''
    const department = departmentValue || ''
    const firstName = data.firstName || ''
    const lastName = data.lastName || ''
    const startDate =
      startDatePicker.toLocaleDateString('en-US', DATEFORMATMMDDYYYY) || ''
    const state = stateValue || ''
    const street = data.street || ''
    const zipCode = data.zipCode || ''

    // the joi code splitting loading on submit (CRA dynamic import)
    import('../../components/MySchemaValidator')
      .then(async ({ MySchemaValidator }) => {
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

        // joi validation
        checkAccountValidity(true)
        try {
          const employee = new Employee(
            firstName,
            lastName,
            startDate,
            department,
            dateOfBirth,
            street,
            city,
            state,
            zipCode
          )

          await schema.validateAsync(employee)
          dispatch(loadingActions.set(true))
          // Add the employee
          employeesService.addEmployee(employee)
          try {
            dispatch(
              employeesActions.saveEmployee(employeesService.allEmployees())
            )
            dispatch(loadingActions.set(false))
            dispatch(modalCreateEmployeeActions.set(true))
          } catch (e) {
            checkAccountValidity(false)
            dispatch(loadingActions.set(false))
          }
        } catch (e) {
          checkAccountValidity(false)
        }
      })
      .catch((err) => {
        checkAccountValidity(false)
      })
  }

  return (
    <main className="main bg-dark">
      <SectionContainer>
        <i className="fa fa-user-circle sign-in-icon"></i>
        <StyledH1>Create employee</StyledH1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              {...register('firstName', {
                required: false,
                maxLength: 255,
                pattern: REGEXTEXT,
              })}
            />
            {errors.firstName ? (
              <StyledErrors>
                The first name's maximum length is 255, and must only contain
                text.
              </StyledErrors>
            ) : null}
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              {...register('lastName', {
                required: false,
                maxLength: 255,
                pattern: REGEXTEXT,
              })}
            />
            {errors.lastName ? (
              <StyledErrors>
                The last name's maximum length is 255, and must only contain
                text.
              </StyledErrors>
            ) : null}
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <MyDatePicker
              liftingDatePickerValueUp={(value: Date) => {
                handleDateOfBirthSelected(value)
              }}
              id="dateOfBirth"
            />
            {errors.dateOfBirth ? (
              <StyledErrors>
                The date of birth format is MM/DD/YYYY.
              </StyledErrors>
            ) : null}
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="startDate">Start Date</label>
            <MyDatePicker
              liftingDatePickerValueUp={(value: Date) => {
                handleStartDateSelected(value)
              }}
              id="startDate"
            />
            {errors.startDate ? (
              <StyledErrors>The start date format is MM/DD/YYYY.</StyledErrors>
            ) : null}
          </InputWrapper>
          <fieldset className="fieldset-employee">
            <legend>Address</legend>
            <InputWrapper>
              <label htmlFor="street">Street</label>
              <input
                type="text"
                id="street"
                {...register('street', {
                  required: false,
                  maxLength: 255,
                  pattern: REGEXTEXTANDNUMBERS,
                })}
              />
              {errors.street ? (
                <StyledErrors>
                  The street's maximum length is 255, and must only contain text
                  and numbers.
                </StyledErrors>
              ) : null}
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                {...register('city', {
                  required: false,
                  maxLength: 255,
                  pattern: REGEXTEXT,
                })}
              />
              {errors.city ? (
                <StyledErrors>
                  The city's maximum length is 255, and must only contain text.
                </StyledErrors>
              ) : null}
            </InputWrapper>
            <InputWrapper>
              <label id="state">State</label>
              <Dropdown
                labelId="state"
                defaultValue={{
                  value: 'Alabama',
                  overrideValue: 'AL',
                }}
                data={STATES}
                messageIfNoData="No data found"
                liftingDropDownValueUp={handleStateDropdown}
              />
              {errors.state ? (
                <StyledErrors>
                  The state's maximum length is 255 (only characters and numbers
                  allowed).
                </StyledErrors>
              ) : null}
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="text"
                id="zipCode"
                {...register('zipCode', {
                  required: false,
                  maxLength: 32,
                  pattern: REGEXUSZIPCODES,
                })}
              />
              {errors.zipCode ? (
                <StyledErrors>
                  The zip code's maximum length is 32, with the US format (ex. :
                  12345 or 12345-6789)
                </StyledErrors>
              ) : null}
            </InputWrapper>
          </fieldset>
          <InputWrapper>
            <label id="department">Department</label>
            <Dropdown
              labelId="department"
              defaultValue={{ value: 'Marketing' }}
              data={DEPARTMENTS}
              messageIfNoData="No data found"
              liftingDropDownValueUp={handleDepartmentDropdown}
            />
            {errors.department ? (
              <StyledErrors>
                The department's maximum length is 255 (only characters and
                numbers allowed).
              </StyledErrors>
            ) : null}
          </InputWrapper>
          <button type="submit" className="sign-in-button">
            Save
          </button>
          {!isValidAccount ? (
            <StyledAccountError>Unable to create employee.</StyledAccountError>
          ) : null}
        </form>
        <MyModal ariaLabel="Employee created" textContent="Employee created!" />
      </SectionContainer>
    </main>
  )
}

export default Home
