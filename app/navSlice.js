import { createSlice } from '@reduxjs/toolkit'

export const navSlice = createSlice({
  name: 'nav',
  initialState: {
    openTab: 1,
    query: '',
  },
  reducers: {
    setOpenTab: (state, action) => {
      state.openTab = action.payload.tab
      state.query = action.payload.query || ''
    },
  },
})

export const { setOpenTab } = navSlice.actions

export default navSlice.reducer
