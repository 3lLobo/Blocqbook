import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Conversation from '../../../xmtp/components/Conversation/Conversation.tsx'

const ConversationPage: NextPage = () => {
  const router = useRouter()
  const recipientWalletAddr = router.query.recipientWalletAddr as string
  return <Conversation recipientWalletAddr={recipientWalletAddr} />
}

export default ConversationPage
