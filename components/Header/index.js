// import { Disclosure } from '@chakra-ui/react'
import { ColorModeToggle } from './colorModeToggle'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MyButton } from '../Buttons/MyButton'
import { useCallback, useRef, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reset as resetEvm, setConnection, setPoaps } from '../../app/evmSlice'
import { reset as resetContacts } from '../../app/contactSlice'
import { ethers } from 'ethers'

import { useViewerConnection } from '@self.id/react'
import { EthereumAuthProvider } from '@self.id/web'
import { useRouter } from 'next/router'
import { useLazyGetPoapsQuery } from '../../app/poapApi'

import useWallet from '../../xmtp/hooks/useWallet.ts'
import useXmtp from '../../xmtp/hooks/useXmtp.ts'

async function createAuthProvider() {
  // The following assumes there is an injected `window.ethereum` provider

  const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
  const address = accounts[0]
  const provider = new EthereumAuthProvider(window.ethereum, address)
  return provider
}

export default function Header() {
  const router = useRouter()
  const [isAbleToRefresh, setIsAbleToRefresh] = useState(false)
  const store = useSelector((state) => state.evm)
  const dispatch = useDispatch()
  const [poapTrigger, poapResult, poapLastPromiseInfo] = useLazyGetPoapsQuery()

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
  const [signer, setSigner] = useState(null)

  //XTPM
  const { connect: connectXmtp, disconnect: disconnectXmtp } = useXmtp()
  // const {
  //   signer,
  //   connect: connectWallet,
  //   disconnect: disconnectWallet,
  // } = useWallet()

  // const handleConnect = useCallback(async () => {
  //   await connectWallet()
  // }, [connectWallet])

  const usePrevious = (value) => {
    const ref = useRef()
    useEffect(() => {
      ref.current = value
    })
    return ref.current
  }
  const prevSigner = usePrevious(signer)

  useEffect(() => {
    if (!signer && prevSigner) {
      disconnectXmtp()
    }
    if (!signer || signer === prevSigner) return
    const connect = async () => {
      const prevAddress = await prevSigner?.getAddress()
      const address = await signer.getAddress()
      if (address === prevAddress) return
      connectXmtp(signer)
    }
    connect()
  }, [signer, prevSigner, connectXmtp, disconnectXmtp])

  // Ceramic
  const [connection, connect, disconnect] = useViewerConnection()

  useEffect(() => {
    const checkIfRefresh = async () => {
      connectCeramic()
    }
    console.log('Ceramic client: ', connection)
    if (store.isConnected && connection.status === 'idle') {
      checkIfRefresh()
    }
  }, [connection.status, isAbleToRefresh])

  async function connectCeramic() {
    const authProvider = await createAuthProvider()
    // trigger POAP fetching
    poapTrigger({ address: window.ethereum.selectedAddress }, true)
    connect(authProvider)
      .then(() => {
        // setIsConnected(true)
        setIsAbleToRefresh(true)
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
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        setSigner(provider.getSigner())
        router.push('/rotarydial')
      })
      .catch((error) => {
        console.log(error)
        dispatch(resetEvm())
        dispatch(resetContacts())
      })
  }

  async function connectButtonHit() {
    if (connection.status === 'connected') {
      //since there's no way to disconnect metamask from frontend and
      //we check if there's an account to rehydrate our app. We need a
      //toast here to ask to disconnect metamask aswell
      disconnect()
      setIsAbleToRefresh(false)
    } else {
      // await handleConnect()
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
              className="ml-3 mr-auto px-2 py-1 bg-indigo-500 bg-opacity-80 rounded-tr-xl rounded-bl-xl text-snow text-xs hover:text-snow-muted hover:bg-indigo-600 transition-colors duration-300 truncate"
            >
              {store.account}
            </motion.div>
            <div className="sm:inset-auto sm:ml-6 flex gap-2">
              <ColorModeToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
