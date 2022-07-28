import Employee from '../../interfaces/employee.type'

const allEmployees = () => {
  const employees = localStorage.getItem('employees')
  return employees!==null ? JSON.parse(employees) : []
}

const addEmployee = (employee: Employee) => {
  const employees = allEmployees()
  employees.push(employee)
  localStorage.setItem('employees', JSON.stringify(employees))
}

const employeesService = {
  allEmployees,
  addEmployee,
}
export default employeesService
