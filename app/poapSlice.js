import { createSlice } from '@reduxjs/toolkit'

export const poapSlice = createSlice({
  name: 'poap',
  initialState: {
    events: [],
  },
  reducers: {
    toggleTheme: (state) => {
      state.events = []
    },
  },
})

export const { toggleTheme } = poapSlice.actions

export default poapSlice.reducer
