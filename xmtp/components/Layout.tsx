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
import messageComposerStyles from '../styles/MessageComposer.module.css'


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

const Layout: React.FC = ({ children }) => {
  const [addressToSend, setAddressToSend] = useState('')
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
  const recipientWalletAddr = router.query.to as string

  const handleConnect = useCallback(async () => {
    await connectWallet()
  }, [connectWallet])

  const handleNewConversation = (e) => {
    e.preventDefault()
    router.push({
      pathname: '/rotarydial', 
      query: {to: addressToSend}
    }, 
      {shallow: true}
    )
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
              <div className='mt-20 flex items-center w-full'>
                  <input 
                    className='w-11/12' 
                    type='text' 
                    onChange={e => setAddressToSend(e.target.value)} 
                    value={addressToSend}
                    placeholder='New conversation' 
                  />
                  <button onClick={handleNewConversation} className={messageComposerStyles.arrow}>
                  {addressToSend.length === 42
                    ?<svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13 25.7999C20.0693 25.7999 25.8 20.0692 25.8 13C25.8 5.93071 20.0693 0.199951 13 0.199951C5.93077 0.199951 0.200012 5.93071 0.200012 13C0.200012 20.0692 5.93077 25.7999 13 25.7999ZM18.9314 11.8686L14.1314 7.06858C13.5065 6.44374 12.4935 6.44374 11.8686 7.06858L7.06864 11.8686C6.4438 12.4934 6.4438 13.5065 7.06864 14.1313C7.69348 14.7562 8.70654 14.7562 9.33138 14.1313L11.4 12.0627L11.4 17.8C11.4 18.6836 12.1164 19.4 13 19.4C13.8837 19.4 14.6 18.6836 14.6 17.8V12.0627L16.6686 14.1313C17.2935 14.7562 18.3065 14.7562 18.9314 14.1313C19.5562 13.5065 19.5562 12.4934 18.9314 11.8686Z" fill="#2EC053"/>
                    </svg> 
                    :<svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13 25.7999C20.0693 25.7999 25.8 20.0692 25.8 13C25.8 5.93071 20.0693 0.199951 13 0.199951C5.93077 0.199951 0.200012 5.93071 0.200012 13C0.200012 20.0692 5.93077 25.7999 13 25.7999ZM18.9314 11.8686L14.1314 7.06858C13.5065 6.44374 12.4935 6.44374 11.8686 7.06858L7.06864 11.8686C6.4438 12.4934 6.4438 13.5065 7.06864 14.1313C7.69348 14.7562 8.70654 14.7562 9.33138 14.1313L11.4 12.0627V17.7999C11.4 18.6836 12.1164 19.4 13 19.4C13.8837 19.4 14.6 18.6836 14.6 17.7999V12.0627L16.6686 14.1313C17.2935 14.7562 18.3065 14.7562 18.9314 14.1313C19.5562 13.5065 19.5562 12.4934 18.9314 11.8686Z" fill="#989CA7"/>
                    </svg>
                  }
                  </button>
              </div>}
            {/* </NavigationHeaderLayout> */}
            <NavigationPanel onConnect={handleConnect} />
          </NavigationColumnLayout>
        </NavigationView>
        {/* <ConversationView> */}
          {walletAddress && client && recipientWalletAddr!==undefined &&
            <Conversation recipientWalletAddr={recipientWalletAddr} />
          }
      </div>
  )
}

export default Layout
