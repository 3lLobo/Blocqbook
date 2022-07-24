import XmtpProvider from './XmtpProvider'
import Layout from '../components/Layout'
import { WalletProvider } from './WalletProvider'

type AppProps = {
  children?: any
}

function App() {
  return (
    // <WalletProvider>
    //   <XmtpProvider>
    <Layout></Layout>
    //   </XmtpProvider>
    // </WalletProvider>
  )
}

export default App
