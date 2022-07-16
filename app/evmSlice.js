import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  provider: null,
  gasPrice: null,
  ethPrice: null,
  account: null,
  chainId: '1',
  connected: false,
  contactList: [],
  contactNames: {},
  hasInitialRecord: false,
}

export const evmSlice = createSlice({
  name: 'evm',
  initialState,
  reducers: {
    setGasPrice: (state, action) => {
      const { gasPrice } = action.payload
      state.gasPrice = gasPrice
    },
    setEthPrice: (state, action) => {
      const { ethPrice } = action.payload
      state.ethPrice = ethPrice
    },
    setConnection: (state, action) => {
      state.connected = action.payload.connected
      if (action.payload.connected) {
        state.account = action.payload.account
        state.chainId = action.payload.chainId
      } else {
        state.account = null
        state.chainId = '1'
      }
    },
    setContacts: (state, action) => {
      state.contactList = []
      state.contactNames = {}
      action.payload.contacts.forEach((contact) => {
        state.contactList.push(contact.bio.address)
        state.contactNames[contact.bio.address] = contact.bio.name
      })
      // check if we already loaded data from the record
      if (action.payload.isInitialRecord) {
        state.hasInitialRecord = true
      }
    },
    reset: () => initialState,
  },
})

export const { setGasPrice, setEthPrice, setConnection, setContacts, reset } =
  evmSlice.actions

export default evmSlice.reducer
