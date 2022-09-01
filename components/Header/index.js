// import { Disclosure } from '@chakra-ui/react'
import { ColorModeToggle } from './colorModeToggle'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MyButton } from '../Buttons/MyButton'
import { useCallback, useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reset as resetEvm, setConnection, setPoaps } from '../../app/evmSlice'
import { reset as resetContacts } from '../../app/contactSlice'
import { ethers } from 'ethers'

import { useViewerConnection } from '@self.id/react'
import { EthereumAuthProvider } from '@self.id/web'
import { useRouter } from 'next/router'
import { useLazyGetPoapsQuery } from '../../app/poapApi'

import useXmtp from '../../xmtp/hooks/useXmtp.ts'
import { getWeb3Signer } from '../../lib/xmtpSigner'
import { useLogRocket } from '../../hooks/useLogrocket'

async function createAuthProvider() {
  // The following assumes there is an injected `window.ethereum` provider
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
  const address = accounts[0]
  const provider = new EthereumAuthProvider(window.ethereum, address)
  return provider
}

export default function Header() {
  const router = useRouter()
  const [isAbleToRefresh, setIsAbleToRefresh] = useState(true)
  const store = useSelector((state) => state.evm)
  const dispatch = useDispatch()
  const [poapTrigger, poapResult, poapLastPromiseInfo] = useLazyGetPoapsQuery()

  // Logging webstats
  useLogRocket()

  // TODO: useEffect to auto connect if wallet is connected
  useEffect(() => {
    async function autoConnect() {
      const accounts = await ethereum
        .request({ method: 'eth_accounts' })
        .catch((e) => {
          console.error(e)
          return []
        })
      if (accounts.length > 0) {
        await connectCeramic()
      }
    }
    if (isAbleToRefresh && !store.connected) {
      autoConnect()
    }
  }, [isAbleToRefresh])

  // Wait for poap result and store it.
  useEffect(() => {
    if (poapResult.isSuccess) {
      if (poapResult.data.length !== store.poaps.length) {
        const poaps = poapResult.data.map((poap) => {
          return poap.event.id
        })
        dispatch(setPoaps({ poaps }))
      }
    }
  }, [poapResult, store.poaps, dispatch])
  // const [signer, setSigner] = useState(null)

  //XTPM
  const { connect: connectXmtp, disconnect: disconnectXmtp } = useXmtp()

  // Ceramic
  const [connection, connect, disconnect] = useViewerConnection()

  async function connectCeramic() {
    const authProvider = await createAuthProvider()
    // trigger POAP fetching
    poapTrigger({ address: authProvider.address }, true)
    try {
      await connect(authProvider)
      const signer = getWeb3Signer()
      await connectXmtp(signer)
      const chainId =
        ethers.utils.arrayify(window.ethereum.chainId, {
          hexPad: 'left',
        })[0] || 1
      dispatch(
        setConnection({
          connected: true,
          account: authProvider.address,
          chainId: chainId.toString(),
        })
      )
      router.push('/rotarydial')
    } catch (error) {
      console.log(error)
      dispatch(resetEvm())
      dispatch(resetContacts())
    }
  }
  // }, [connect, dispatch, router, poapTrigger])

  async function connectButtonHit() {
    if (connection.status === 'connected') {
      //since there's no way to disconnect metamask from frontend and
      //we check if there's an account to rehydrate our app. We need a
      //toast here to ask to disconnect metamask aswell
      setIsAbleToRefresh(false)
      disconnect()
    } else {
      setIsAbleToRefresh(true)
      connectCeramic()
    }
    // Set event listener for disconnecting a wallet
    window.ethereum.on('accountsChanged', (accounts) => {
      // If user has locked/logout from MetaMask, this resets the accounts array to empty
      if (!accounts.length) {
        console.log('Metamask disconnected!')
        disconnect()
        dispatch(resetEvm())
      }
    })
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
              text={store.connected ? 'Disconnect' : 'Connect'}
              onClick={connectButtonHit}
              primary={false}
            >
              {!store.connected && (
                <div className="relative flex col-span-1 h-6 w-6 rounded-full ml-1">
                  <Image alt="metamask" layout="fill" src="/metamask.png" />
                </div>
              )}
            </MyButton>
            <motion.div
              initial={false}
              animate={store.connected ? 'visible' : 'hidden'}
              exit={{ opacity: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.5 }}
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: -500 },
              }}
              title={store.account}
              className="hidden md:flex ml-3 mr-auto px-2 py-1 bg-indigo-500 bg-opacity-80 rounded-tr-xl rounded-bl-xl text-snow text-xs hover:text-snow-muted hover:bg-indigo-600 transition-colors duration-300 truncate"
            >
              {store.account}
            </motion.div>
            <div className="sm:inset-auto sm:ml-6 flex gap-2 ml-32 ">
              <ColorModeToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
