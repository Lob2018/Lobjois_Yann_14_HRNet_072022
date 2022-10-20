import { useState } from 'react'

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

import {
  regexUSDate,
  regexText,
  regexTextAndNumbers,
  regexUSZipCodes,
} from '../../utils/regex'

import { DateFormetMmDdYyyy } from '../../utils/date'

import MyDatePicker from '../../components/MyDatePicker'
import MyModal from '../../components/MyModal'

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

function AddUseForm() {
  const dispatch = useDispatch()

  // dateOfBirthPicker with controls
  const [dateOfBirthPicker, setDateOfBirthPicker] = useState(new Date())
  const handleDateOfBirthSelected = (value: Date) => {
    controlCustomValue('dateOfBirth', value)
    setDateOfBirthPicker(value ? value : new Date())
  }

  // startDatePicker with controls
  const [startDatePicker, setStartDatePicker] = useState(new Date())
  const handleStartDateSelected = (value: Date) => {
    controlCustomValue('startDate', value)
    setStartDatePicker(value ? value : new Date())
  }

  // state dropdown with controls
  const [stateValue, setStateValue] = useState('')
  const handleStateDropdown = (value: string) => {
    controlCustomValue('state', value)
    setStateValue(value ? value : '')
  }

  // department dropdown with controls
  const [departmentValue, setDepartmentValue] = useState('')
  const handleDepartmentDropdown = (value: string) => {
    controlCustomValue('department', value)
    setDepartmentValue(value ? value : '')
  }

  const controlCustomValue = (name: string, value: Date | string) => {
    if (typeof value === 'string') {
      if (value.length >= 255 || !value.match(regexTextAndNumbers)) {
        setError('department', {})
      } else clearErrors('department')
      setDepartmentValue(value ? value : '')
      return
    }
    if (
      value.toLocaleDateString('en-US', DateFormetMmDdYyyy).match(regexUSDate)
    ) {
      clearErrors(name)
    } else setError(name, {})
    setDateOfBirthPicker(value ? value : new Date())
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
      dateOfBirthPicker.toLocaleDateString('en-US', DateFormetMmDdYyyy) || ''
    const department = departmentValue || ''
    const firstName = data.firstName || ''
    const lastName = data.lastName || ''
    const startDate =
      startDatePicker.toLocaleDateString('en-US', DateFormetMmDdYyyy) || ''
    const state = stateValue || ''
    const street = data.street || ''
    const zipCode = data.zipCode || ''
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
      // joi's corresponding schema, with code splitting, loading on submit (CRA dynamic import)
      const { schema } = await import('../../components/MySchemaValidator')
      await schema.validateAsync(employee)

      // Add the employee
      dispatch(loadingActions.set(true))
      employeesService.addEmployee(employee)
      try {
        dispatch(employeesActions.saveEmployee(employeesService.allEmployees()))
        dispatch(loadingActions.set(false))
        dispatch(modalCreateEmployeeActions.set(true))
      } catch (e) {
        checkAccountValidity(false)
        dispatch(loadingActions.set(false))
      }
    } catch (e) {
      checkAccountValidity(false)
    }
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
                pattern: regexText,
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
                pattern: regexText,
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
                  pattern: regexTextAndNumbers,
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
                  pattern: regexText,
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
                  pattern: regexUSZipCodes,
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
export default AddUseForm
