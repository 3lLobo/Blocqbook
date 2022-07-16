// import { Disclosure } from '@chakra-ui/react'
import { ColorModeToggle } from './colorModeToggle'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MyButton } from '../Buttons/MyButton'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reset, setConnection } from '../../app/evmSlice'
import { ethers } from 'ethers'

import { useViewerConnection } from '@self.id/react'
import { EthereumAuthProvider } from '@self.id/web'



async function createAuthProvider() {
  // The following assumes there is an injected `window.ethereum` provider
  const addresses = await window.ethereum.request({ method: 'eth_requestAccounts' })
  return new EthereumAuthProvider(window.ethereum, addresses[0])
}

export default function Header() {
  const store = useSelector((state) => state.evm)
  const dispatch = useDispatch()

  const [connection, connect, disconnect] = useViewerConnection()

  const [isConnected, setIsConnected] = useState(false)
  useEffect(() => {
    if (connection.status === 'connected') {
      setIsConnected(true)
      const chainId =
        ethers.utils.arrayify(window.ethereum.chainId, {
          hexPad: 'left',
        })[0] || 1
      dispatch(
        setConnection({
          connected: true,
          account: window.ethereum.selectedAddress,
          chainId: chainId.toString(),
        })
      )
    } else {
      dispatch(reset())
    }

  }, [connection.status, dispatch])

  // Manage Metamask changes and couple with state
  useEffect(() => {
    if (window?.ethereum?.isConnected()) {
      const chainId =
        ethers.utils.arrayify(window.ethereum.chainId, {
          hexPad: 'left',
        })[0] || 1
      dispatch(
        setConnection({
          connected: true,
          account: window.ethereum.selectedAddress,
          chainId: chainId.toString(),
        })
      )
      // Set event listener for disconnecting a wallet
      window.ethereum.on('disconnect', () => {
        // TODO: make this a toast
        console.log('Metamask disconnected!')
        disconnect()
        dispatch(reset())

      })
    }
  }, [dispatch, disconnect])

  async function connectButtonHit() {
    if (connection.status === 'connected') {
      disconnect()
    } else {
      const authProvider = await createAuthProvider()
      connect(authProvider)
    }
  }

  return (
    <>
      <div
        as="nav"
        className="dark:backdrop-brightness-150 flex z-40 sticky top-0 shadow-xl overflow-hidden"
      > 
        <div className='flex items-center px-2 sm:px-6 h-16'>
          <h2 className='flex-nowrap items-center text-xl font-semibold text-indigo-600 dark:text-white'>
            Block book
          </h2>
          <div className="flex flex-end items-center gap-1 ml-[30vw]">
            <div className="sm:inset-auto sm:ml-6">
              <ColorModeToggle />
            </div>
            <MyButton
              text={isConnected ? 'Disconnect' : 'Connect'}
              onClick={connectButtonHit}
              primary={false}
            >
              <div className="relative flex col-span-1 h-4 w-4 rounded-full ml-3" >
                <Image
                  alt='metamask'
                  layout='fill'
                  src='/metamask.png'
                />
              </div>
            </MyButton>
            {/* {!isConnected && ( */}
              <div className='p-2 outline-none rounded text-indigo-600 shadow-indigo-200 font-medium'>
                {store.account}
              </div>
            {/* )} */}
          </div>
        </div>
      </div>
    </>
  )
}
