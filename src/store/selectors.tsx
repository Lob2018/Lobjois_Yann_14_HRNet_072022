import Employees from '../interfaces/employees.interface'
import Loading from '../interfaces/loading.interface'
import ModalCreateEmployee from '../interfaces/modalCreateEmployee.interface'


export const selectLoading = (state: Loading) => state.loading
export const selectEmployees = (state: Employees) => state.employees
export const selectModalCreateEmployee = (state: ModalCreateEmployee) => state.modalCreateEmployee

