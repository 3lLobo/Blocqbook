import * as React from 'react'
import '../styles/globals.css'
import { store } from '../app/store'
import { Provider } from 'react-redux'
import { Provider as CeramicProvider } from '@self.id/react'
import XmtpProvider from '../xmtp/components/XmtpProvider.tsx'
// import WalletProvider from '../xmtp/components/WalletProvider.tsx'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <CeramicProvider client={{ ceramic: 'testnet-clay' }}>
          <XmtpProvider>
            <Component {...pageProps} />
          </XmtpProvider>
      </CeramicProvider>
    </Provider>
  )
}

export default MyApp
