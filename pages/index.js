import { Head } from '../components/Head'
import Image from 'next/image'
import Header from '../components/Header'
import { Transactions } from '../components/Transactions'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setConnection } from '../app/evmSlice'


export default function Home() {
  const store = useSelector(state => state.evm)
  const dispatch = useDispatch()

  useEffect(() => {
    if (window?.ethereum?.isConnected()) {
      dispatch(setConnection({
        connected: true,
        account: window.ethereum.selectedAddress,
        chainId: '1',
        // TODO: convert from hex to string
        // chainId: window.ethereum.chainId,
      }))
    }
  }, [dispatch])

  return (
    // <div className="bg-mybg-light min-h-screen flex flex-col ">
    <div className="bg-mybg-light dark:bg-mybg-dark dark:text-snow dark:font-medium min-h-screen ">
      <Head />
      <Header />

      <main className="z-10 mx-auto max-w-6xl scrollbar-hide my-11 flex flex-col flex-grow">
        <div
          className='mx-auto '
        >
          <Image
            height={311}
            width={311}
            src="/ethereum-eth-logo-animated.gif"
            alt="ETHgif"
          />
        </div>
        <div
          className='mx-auto '
        >
          <Transactions />

        </div>

      </main>

      <footer className="mt-auto mb-0"></footer>
    </div>
  )
}
