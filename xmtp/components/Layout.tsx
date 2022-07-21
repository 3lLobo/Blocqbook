import { useCallback, useEffect, useRef } from 'react'
import useXmtp from '../hooks/useXmtp.ts'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import useWallet from '../hooks/useWallet.ts'
import NavigationView from './Views/NavigationView.tsx'
import ConversationView from './Views/ConversationView.tsx'
import RecipientControl from './Conversation/RecipientControl.tsx'
import NewMessageButton from './NewMessageButton.tsx'
import NavigationPanel from './NavigationPanel.tsx'
import XmtpInfoPanel from './XmtpInfoPanel.tsx'
import UserMenu from './UserMenu.tsx'
import BackArrow from './BackArrow.tsx'

const NavigationColumnLayout: React.FC = ({ children }) => (
  <aside className="flex w-full md:w-80 flex-col flex-grow fixed inset-y-0">
    <div className="flex flex-col flex-grow md:border-r md:border-gray-200 bg-white overflow-y-auto">
      {children}
    </div>
  </aside>
)

const NavigationHeaderLayout: React.FC = ({ children }) => (
  <div className="h-[72px] bg-p-600 flex items-center justify-between flex-shrink-0 px-4">
    <Link href="/" passHref={true}>
      <img className="h-8 w-auto" src="/xmtp-icon.png" alt="XMTP" />
    </Link>
    {children}
  </div>
)

const TopBarLayout: React.FC = ({ children }) => (
  <div className="sticky top-0 z-10 flex-shrink-0 flex bg-zinc-50 border-b border-gray-200 md:bg-white md:border-0">
    {children}
  </div>
)

const ConversationLayout: React.FC = ({ children }) => {
  const router = useRouter()
  const recipientWalletAddress = router.query.recipientWalletAddr as string

  const handleSubmit = useCallback(
    async (address: string) => {
      router.push(address ? `/dm/${address}` : '/dm/')
    },
    [router]
  )

  const handleBackArrowClick = useCallback(() => {
    router.push('/')
  }, [router])

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
  const {
    connect: connectXmtp,
    disconnect: disconnectXmtp,
    walletAddress,
    client,
  } = useXmtp()
  const router = useRouter()
  const {
    signer,
    connect: connectWallet,
    disconnect: disconnectWallet,
  } = useWallet()

  const handleDisconnect = useCallback(async () => {
    disconnectXmtp()
    await disconnectWallet()
    router.push('/')
  }, [disconnectWallet, disconnectXmtp, router])

  const handleConnect = useCallback(async () => {
    await connectWallet()
  }, [connectWallet])

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
  console.log('walletAddress:', walletAddress);
  console.log('client:', client);

  return (
      <div>
        <NavigationView>
          <NavigationColumnLayout>
            <NavigationHeaderLayout>
              {walletAddress && client && <NewMessageButton />}
            </NavigationHeaderLayout>
            <NavigationPanel onConnect={handleConnect} />
            <UserMenu
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
            />
          </NavigationColumnLayout>
        </NavigationView>
        <ConversationView>
          {walletAddress && client ? (
            <ConversationLayout>{children}</ConversationLayout>
          ) : (
            <XmtpInfoPanel onConnect={handleConnect} />
          )}
        </ConversationView>
      </div>
  )
}

export default Layout
