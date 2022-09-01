import LogRocket from 'logrocket'
import { useCallback, useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function initLogRocket() {
  const lrKey = process.env.NEXT_PUBLIC_LOGROCKET

  if (lrKey) {
    LogRocket.init(lrKey + '/blocqbook')
    console.log('Success: init logrocket!')
  }
}

export function useLogRocket() {
  const store = useSelector((state) => state.evm)
  const [prevAddress, setPrevAddress] = useState(null)
  const [lrInit, setLrInit] = useState(false)

  // Logging webstats
  useEffect(() => {
    if (!lrInit) {
      initLogRocket()
      setLrInit(true)
    }
  }, [lrInit])

  useEffect(() => {
    if (store.account !== prevAddress && lrInit && store.connected) {
      LogRocket.identify(store.account, {
        name: store.account,
        email: store.account,
      })
      setPrevAddress(store.account)
    }
  }, [store.account, prevAddress, lrInit, store.connected])
}
