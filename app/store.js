import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { enableMapSet } from 'immer'

import themeSliceReducer from './themeSlice'
import evmSliceReducer from './evmSlice'
import contactSliceReducer from './contactSlice'
import navSliceReducer from './navSlice'
import { poapApi } from './poapApi'
import { covApi } from './covApi'
import { thegraphApi } from './thegraphApi'
import LogRocket from 'logrocket';

export const store = configureStore({
  reducer: {
    theme: themeSliceReducer,
    evm: evmSliceReducer,
    contact: contactSliceReducer,
    nav: navSliceReducer,
    [poapApi.reducerPath]: poapApi.reducer,
    [covApi.reducerPath]: covApi.reducer,
    [thegraphApi.reducerPath]: thegraphApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      //serializableCheck: false,
    })
      .concat(poapApi.middleware)
      .concat(covApi.middleware)
      .concat(thegraphApi.middleware)
      .concat(LogRocket.reduxMiddleware()),
  //
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
enableMapSet()
