import Employees from '../interfaces/employees.interface'
import Loading from '../interfaces/loading.interface'

export const selectLoading = (state: Loading) => state.loading
export const selectEmployees = (state: Employees) => state.employees
