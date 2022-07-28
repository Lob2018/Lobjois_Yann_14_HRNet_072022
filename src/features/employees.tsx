import { createSlice } from '@reduxjs/toolkit'

const { actions, reducer } = createSlice({
  // the slice's name
  name: 'employees',
  // the initial state
  initialState: [],
  // reducers define actions and the reducer
  reducers: {
    // the set action ('employees/saveEmployee')
    saveEmployee: (state, action) => {
      return action.payload
    },
  },
})
// we export each action individually
export const { saveEmployee } = actions
// we export the reducer as default export
export default reducer
