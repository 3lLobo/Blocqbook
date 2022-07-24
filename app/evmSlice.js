import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  provider: null,
  gasPrice: null,
  ethPrice: null,
  account: null,
  chainId: '1',
  connected: false,
  poaps: [],
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
    setPoaps: (state, action) => {
      state.poaps = action.payload.poaps
    },
    reset: () => initialState,
  },
})

export const { setGasPrice, setEthPrice, setConnection, setPoaps, reset } =
  evmSlice.actions

export default evmSlice.reducer
