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
    <div className="w-full h-screen">
      <Layout></Layout>
    </div>
    //   </XmtpProvider>
    // </WalletProvider>
  )
}

export default App
