import * as React from 'react'
import '../styles/globals.css'
import { store } from '../app/store'
import { Provider } from 'react-redux'
import { Provider as CeramicProvider } from '@self.id/react'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <CeramicProvider client={{ ceramic: 'testnet-clay' }} >
      <Component {...pageProps} />
      </CeramicProvider >
    </Provider>
  )
}

export default MyApp
