import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  provider: null,
  gasPrice: null,
  ethPrice: null,
  account: null,
  connected: false,
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
    setAccount: (state, action) => {
      const { account } = action.payload
      state.account = account
    },
    setConnection: (state, action) => {
      state.connected = action.payload.connected
      console.log(
        '🚀 ~ file: evmSlice ~ line 30 ~ action.payload.connected',
        action.payload.connected
      )
      if (action.payload.connected) {
        state.account = action.payload.account
        console.log(
          '🚀 ~ file: evmSlice ~ line 33 ~ action.payload.account',
          action.payload.account
        )
      } else {
        state.account = null
      }
    },
    reset: () => initialState,
  },
})

export const { setGasPrice, setEthPrice, setAccount, setConnection, reset } =
  evmSlice.actions

export default evmSlice.reducer
