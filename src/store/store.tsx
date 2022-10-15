import loadingReducer from '../features/loading'
import employeesReducer from '../features/employees'
import modalCreateEmployeeReducer from '../features/modalCreateEmployee'

import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    loading: loadingReducer,
    employees: employeesReducer,
    modalCreateEmployee: modalCreateEmployeeReducer
  },
})
