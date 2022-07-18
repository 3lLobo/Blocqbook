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
  await window.ethereum.send('eth_requestAccounts')
  const address = window.ethereum.selectedAddress
  return new EthereumAuthProvider(window.ethereum, address)
}

export default function Header() {
  const store = useSelector((state) => state.evm)
  const dispatch = useDispatch()

  const [connection, connect, disconnect] = useViewerConnection()
  console.log('🚀 ~ file: index.js ~ line 28 ~ Header ~ connection', connection)

  const [isConnected, setIsConnected] = useState(false)
  useEffect(() => {
    if (connection.status === 'idle') {
      checkIfRefresh()
    }
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
      setIsConnected(false)
    }
  }, [connection.status, dispatch])

  async function connectButtonHit() {
    if (connection.status === 'connected') {
      disconnect()
    } else {
      const authProvider = await createAuthProvider()
      await connect(authProvider)
      // Set event listener for disconnecting a wallet
      window.ethereum.on('disconnect', async () => {
        // TODO: make this a toast
        console.log('Metamask disconnected!')
        await disconnect()
        dispatch(reset())
      })
    }
  }

  const checkIfRefresh = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' })
    if (accounts.length > 0) {
      const authProvider = await createAuthProvider()
      await connect(authProvider)
    }
  }

  return (
    <>
      <div
        as="nav"
        className="backdrop-blur-sm dark:backdrop-brightness-150 z-30 sticky top-0 shadow-xl overflow-hidden"
      >
        <div className=" mx-auto px-2 sm:px-6 ">
          <div className=" flex items-center justify-between h-16">
            <MyButton
              text={isConnected ? 'Disconnect' : 'Connect'}
              onClick={connectButtonHit}
              primary={false}
            >
              {!isConnected && (
                <div className="relative flex col-span-1 h-6 w-6 rounded-full ml-1">
                  <Image alt="metamask" layout="fill" src="/metamask.png" />
                </div>
              )}
            </MyButton>
            <motion.div
              initial={false}
              animate={isConnected ? 'visible' : 'hidden'}
              exit={{ opacity: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.5 }}
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: -500 },
              }}
              title={store.account}
              className="ml-3 px-2 py-1 bg-indigo-500 bg-opacity-80 rounded-tr-xl rounded-bl-xl text-snow text-xs hover:text-snow-muted hover:bg-indigo-600 transition-colors duration-300 truncate"
            >
              {store.account}
            </motion.div>
            <div className="items-center justify-center sm:items-stretch sm:justify-start ml-auto">
              <motion.div
                animate={{
                  rotate: [0, 0, 16, -11, 0, 0],
                }}
                transition={{ duration: 2 }}
              >
                <Image
                  height={55}
                  width={111}
                  src="/ethereum-eth-logo-full-horizontal.svg"
                  alt="ETHsvg"
                />
              </motion.div>
            </div>
            <div className="sm:inset-auto sm:ml-6 flex gap-2">
              <ColorModeToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
