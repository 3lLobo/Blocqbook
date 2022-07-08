import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { enableMapSet } from 'immer'

import themeSliceReducer from './themeSlice'
import evmSliceReducer from './evmSlice'

export const store = configureStore({
  reducer: {
    theme: themeSliceReducer,
    evm: evmSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // .concat(bridgeApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
enableMapSet()
