import { lazy, useEffect } from 'react'

import employeesService from '../../components/services/employees.service'
import styled from 'styled-components'

import { useSelector, useDispatch } from 'react-redux'
import { selectEmployees } from '../../store/selectors'
import * as employeesActions from '../../features/employees'

const MUIDataTable = lazy(() => import('mui-datatables'))

const StyledH1 = styled.h1`
  margin-bottom: 2rem;
  font-size: 2em;
  @media (max-width: 480px) {
    margin-top: 0px;
    font-size: 1.5em;
  }
`

function Employees() {
  const dispatch = useDispatch()

  useEffect(() => {
    const el = document.querySelectorAll('span[role="button"]')
    el.forEach((span) => {
      span.setAttribute('aria-hidden', 'true')
    })
  }, [])

  const employees = useSelector(selectEmployees)
  if (!employees.length) {
    const allEmployees = employeesService.allEmployees()
    if (allEmployees.length > 0) {
      dispatch(employeesActions.saveEmployee(allEmployees))
    }
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <StyledH1>Current Employees</StyledH1>
        <MUIDataTable
          title={''}
          data={employees.map((el) => Object.values(el))}
          columns={[
            'First Name',
            'Last Name',
            'Start Date',
            'Department',
            'Date of Birth',
            'Street',
            'City',
            'State',
            'Zip Code',
          ]}
          options={{
            textLabels: {
              body: {
                noMatch: 'No data available in table',
                toolTip: 'Sort',
                columnHeaderTooltip: (column) => `Sort for ${column.label}`,
              },
            },
            filter: false,
            responsive: 'standard',
            rowsPerPageOptions: [],
            download: false,
            print: false,
            viewColumns: false,
            selectableRowsHeader: false,
            selectableRows: 'none',
          }}
        />
      </div>
    </main>
  )
}

export default Employees
