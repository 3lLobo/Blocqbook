import XmtpProvider from './XmtpProvider.tsx'
import Layout from '../components/Layout.tsx'
import { WalletProvider } from './WalletProvider.tsx'

type AppProps = {
  children?: React.ReactNode
}

function App({ children }: AppProps) {
  return (
    // <WalletProvider>
    //   <XmtpProvider>
        <Layout>{children}</Layout>
    //   </XmtpProvider>
    // </WalletProvider>
  )
}

export default App
