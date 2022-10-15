import { createSlice } from '@reduxjs/toolkit'

const { actions, reducer } = createSlice({
  // the slice's name
  name: 'modalCreateEmployee',
  // the initial state
  initialState: false,
  // reducers define actions and the reducer
  reducers: {
    // the set action ('modalCreateEmployee/set')
    set: (_state, action) => {
      return action.payload
    },
  },
})

// we export each action individually
export const { set } = actions
// we export the reducer as default export
export default reducer
