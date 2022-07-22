import { useCallback, useEffect, useRef, useState } from 'react'
import useXmtp from '../hooks/useXmtp.ts'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import useWallet from '../hooks/useWallet.ts'
import NavigationView from './Views/NavigationView.tsx'
import ConversationView from './Views/ConversationView.tsx'
import RecipientControl from './Conversation/RecipientControl.tsx'
import Conversation from './Conversation/Conversation.tsx'
import NewMessageButton from './NewMessageButton.tsx'
import NavigationPanel from './NavigationPanel.tsx'
import XmtpInfoPanel from './XmtpInfoPanel.tsx'
import UserMenu from './UserMenu.tsx'
import BackArrow from './BackArrow.tsx'

const NavigationColumnLayout: React.FC = ({ children }) => (
  <aside className="flex w-96 flex-col flex-grow fixed inset-y-0 right-0">
    <div className="flex flex-col flex-grow border-r border-gray-200 bg-white overflow-y-auto">
      {children}
    </div>
  </aside>
)

const NavigationHeaderLayout: React.FC = ({ children }) => (
  <div className="h-[72px] flex items-center justify-between flex-shrink-0 p-4">
    <Link href="/" passHref={true}>
      BLOCQBOOK
    </Link>
    {children}
  </div>
)

const TopBarLayout: React.FC = ({ children }) => (
  <div className="sticky top-0 z-10 flex-shrink-0 flex bg-zinc-50 border-b border-gray-200 bg-white border-0">
    {children}
  </div>
)

const ConversationLayout: React.FC = ({ children }) => {
  const router = useRouter()
  const recipientWalletAddress = router.query.recipientWalletAddr as string

  const handleSubmit = useCallback(
    async (address: string) => {
      router.push(address ? `/inbox/${address}` : '/inbox/0')
    },
    [router]
  )

  const handleBackArrowClick = useCallback(() => {
    router.push('/')
  }, [router])

  console.log('children:', children);

  return (
    <>
      <TopBarLayout>
        <div className="md:hidden flex items-center ml-3">
          <BackArrow onClick={handleBackArrowClick} />
        </div>
        <RecipientControl
          recipientWalletAddress={recipientWalletAddress}
          onSubmit={handleSubmit}
        />
      </TopBarLayout>
      {/* {children} */}
    </>
  )
}

const Layout: React.FC = ({ children }) => {
  const [addressToSend, setAddressToSend] = useState(null)
  const {
    connect: connectXmtp,
    disconnect: disconnectXmtp,
    walletAddress,
    client,
    conversations,
    loadingConversations,
  } = useXmtp()
  console.log('conversations:', conversations);
  const router = useRouter()
  const {
    signer,
    connect: connectWallet,
    disconnect: disconnectWallet,
  } = useWallet()
  const recipientWalletAddr = router.query.recipientWalletAddr as string

  const handleDisconnect = useCallback(async () => {
    disconnectXmtp()
    await disconnectWallet()
    router.push('/inbox/0')
  }, [disconnectWallet, disconnectXmtp, router])

  const handleConnect = useCallback(async () => {
    await connectWallet()
  }, [connectWallet])

  const handleSubmit = useCallback(
    async (address: string) => {
      router.push(address ? `/inbox/${address}` : '/inbox/0')
    },
    [router]
  )

  const handleNewConversation = (e) => {
    e.preventDefault()
    router.push(`/inbox/${addressToSend}`)
  }

  const usePrevious = <T,>(value: T): T | undefined => {
    const ref = useRef<T>()
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


  return (
    <div className='relative'>
        <NavigationView>
          <NavigationColumnLayout>
            {/* <NavigationHeaderLayout> */}
              {walletAddress && client && 
              <div className=''>
                  <input type='text' onChange={e => setAddressToSend(e.target.value)} value={addressToSend} />
                  <button onClick={handleNewConversation}>New conversation</button>
              </div>}
            {/* </NavigationHeaderLayout> */}
            <NavigationPanel onConnect={handleConnect} />
            {/* <UserMenu
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
            /> */}
          </NavigationColumnLayout>
        </NavigationView>
        {/* <ConversationView> */}
          {walletAddress && client && recipientWalletAddr!=='0' &&
            <Conversation recipientWalletAddr={recipientWalletAddr} />
          }
          {/* {walletAddress && client ? (
            <ConversationLayout>{children}</ConversationLayout>
          ) : (
            <XmtpInfoPanel onConnect={handleConnect} />
          )} */}
        {/* </ConversationView> */}
      </div>
  )
}

export default Layout
