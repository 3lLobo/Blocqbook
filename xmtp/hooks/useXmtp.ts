import { useContext } from 'react'
import { XmtpContextType, XmtpContext } from '../contexts/xmtp'

const useXmtp = (): XmtpContextType => {
  const context = useContext(XmtpContext)
  // console.log("🚀 ~ file: useXmtp.ts ~ line 6 ~ useXmtp ~ XmtpContext", XmtpContext)
  // console.log("🚀 ~ file: useXmtp.ts ~ line 6 ~ useXmtp ~ context", context)
  if (context === undefined) {
    throw new Error('useXmtp must be used within an XmtpProvider')
  }
  return context
}

export default useXmtp
