import { Navigate } from 'react-router-dom'

import employeesService from '../../components/services/employees.service'

import { useSelector, useDispatch } from 'react-redux'
import { selectEmployees } from '../../store/selectors'
import * as employeesActions from '../../features/employees'

import MUIDataTable from 'mui-datatables'

function Employees() {
  const dispatch = useDispatch()

  const employees = useSelector(selectEmployees)
  if (!employees.length) {
    const allEmployees = employeesService.allEmployees()
    if (allEmployees.length > 0) {
      dispatch(employeesActions.saveEmployee(allEmployees))
    }
  }

  const columns = [
    'First Name',
    'Last Name',
    'Start Date',
    'Department',
    'Date of Birth',
    'Street',
    'City',
    'State',
    'Zip Code',
  ]

  const options:any = {
    filter: true,
    filterType: 'dropdown',
    responsive: 'standard',
    rowsPerPageOptions: []
  };

  return (
    <main className="main bg-dark">
      {employees.length > 0 ? (
        <>
          <div className="header">
            <h1>
              Current Employees
              <br />
            </h1>         
                <MUIDataTable
                  title={''}
                  data={employees.map((el) => Object.values(el))}
                  columns={columns}
                  options={options}
                />        
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </main>
  )
}

export default Employees
