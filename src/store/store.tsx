import loadingReducer from '../features/loading'
import employeesReducer from '../features/employees'

import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    loading: loadingReducer,
    employees: employeesReducer,
  },
})
