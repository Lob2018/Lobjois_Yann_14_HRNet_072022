import { useState } from 'react'

import styled from 'styled-components'

import { useForm } from 'react-hook-form'

import employeesService from '../../components/services/employees.service'

import { useDispatch } from 'react-redux'
import * as loadingActions from '../../features/loading'
import * as employeesActions from '../../features/employees'

import Employee from '../../classes/employee.class'

import Dropdown from 'react-dropdown-component-library'
import STATES from '../../data/states'
import DEPARTMENTS from '../../data/departments'

import MyDatePicker from '../../components/MyDatePicker'
import Modal from 'react-modal'

import REGEXUSDATE from '../../utils/regex/regexUSDate'
import REGEXTEXT from '../../utils/regex/regexText'
import REGEXTEXTANDNUMBERS from '../../utils/regex/regexTextAndNumbers'
import REGEXUSZIPCODES from '../../utils/regex/regexUSZipCodes'

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
const StyledModalCloseButton = styled.a`
  position: absolute;
  top: -12.5px;
  right: -12.5px;
  display: block;
  width: 30px;
  height: 30px;
  text-indent: -9999px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAA3hJREFUaAXlm8+K00Acx7MiCIJH/yw+gA9g25O49SL4AO3Bp1jw5NvktC+wF88qevK4BU97EmzxUBCEolK/n5gp3W6TTJPfpNPNF37MNsl85/vN/DaTmU6PknC4K+pniqeKJ3k8UnkvDxXJzzy+q/yaxxeVHxW/FNHjgRSeKt4rFoplzaAuHHDBGR2eS9G54reirsmienDCTRt7xwsp+KAoEmt9nLaGitZxrBbPFNaGfPloGw2t4JVamSt8xYW6Dg1oCYo3Yv+rCGViV160oMkcd8SYKnYV1Nb1aEOjCe6L5ZOiLfF120EjWhuBu3YIZt1NQmujnk5F4MgOpURzLfAwOBSTmzp3fpDxuI/pabxpqOoz2r2HLAb0GMbZKlNV5/Hg9XJypguryA7lPF5KMdTZQzHjqxNPhWhzIuAruOl1eNqKEx1tSh5rfbxdw7mOxCq4qS68ZTjKS1YVvilu559vWvFHhh4rZrdyZ69Vmpgdj8fJbDZLJpNJ0uv1cnr/gjrUhQMuI+ANjyuwftQ0bbL6Erp0mM/ny8Fg4M3LtdRxgMtKl3jwmIHVxYXChFy94/Rmpa/pTbNUhstKV+4Rr8lLQ9KlUvJKLyG8yvQ2s9SBy1Jb7jV5a0yapfF6apaZLjLLcWtd4sNrmJUMHyM+1xibTjH82Zh01TNlhsrOhdKTe00uAzZQmN6+KW+sDa/JD2PSVQ873m29yf+1Q9VDzfEYlHi1G5LKBBWZbtEsHbFwb1oYDwr1ZiF/2bnCSg1OBE/pfr9/bWx26UxJL3ONPISOLKUvQza0LZUxSKyjpdTGa/vDEr25rddbMM0Q3O6Lx3rqFvU+x6UrRKQY7tyrZecmD9FODy8uLizTmilwNj0kraNcAJhOp5aGVwsAGD5VmJBrWWbJSgWT9zrzWepQF47RaGSiKfeGx6Szi3gzmX/HHbihwBser4B9UJYpFBNX4R6vTn3VQnez0SymnrHQMsRYGTr1dSk34ljRqS/EMd2pLQ8YBp3a1PLfcqCpo8gtHkZFHKkTX6fs3MY0blKnth66rKCnU0VRGu37ONrQaA4eZDFtWAu2fXj9zjFkxTBOo8F7t926gTp/83Kyzzcy2kZD6xiqxTYnHLRFm3vHiRSwNSjkz3hoIzo8lCKWUlg/YtGs7tObunDAZfpDLbfEI15zsEIY3U/x/gHHc/G1zltnAgAAAABJRU5ErkJggg==');
`
const StyledModalText = styled.div`
  text-align: left;
`
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '8px',
    boxShadow: '0 0 10px #000',
    width: '70%',
    maxWidth: '500px',
    border: 'none',
    overflow: 'inherit',
  },
}
Modal.setAppElement('#root')

function Home() {
  const dispatch = useDispatch()

  // modal
  const [modalIsOpen, setIsOpen] = useState(false)
  function openModal() {
    setIsOpen(true)
  }
  function closeModal() {
    setIsOpen(false)
  }

  // dateOfBirthPicker with controls
  const [dateOfBirthPicker, setDateOfBirthPicker] = useState(new Date())
  const handleDateOfBirthSelected = (value: Date) => {
    if (value.toLocaleDateString('en-US', dateOptions).match(REGEXUSDATE)) {
      clearErrors('dateOfBirth')
    } else setError('dateOfBirth', {})
    setDateOfBirthPicker(value ? value : new Date())
  }

  // startDatePicker with controls
  const [startDatePicker, setStartDatePicker] = useState(new Date())
  const handleStartDateSelected = (value: Date) => {
    if (value.toLocaleDateString('en-US', dateOptions).match(REGEXUSDATE)) {
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

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }

  const onSubmit = async (data: Record<string, string>) => {
    const city = data.city || ''
    const dateOfBirth =
      dateOfBirthPicker.toLocaleDateString('en-US', dateOptions) || ''
    const department = departmentValue || ''
    const firstName = data.firstName || ''
    const lastName = data.lastName || ''
    const startDate =
      startDatePicker.toLocaleDateString('en-US', dateOptions) || ''
    const state = stateValue || ''
    const street = data.street || ''
    const zipCode = data.zipCode || ''

    // the joi code splitting loading on submit
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
            openModal()
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
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Employee created"
        >
          <StyledModalCloseButton onClick={closeModal}>
            Close
          </StyledModalCloseButton>
          <StyledModalText>Employee created!</StyledModalText>
        </Modal>
      </SectionContainer>
    </main>
  )
}

export default Home
