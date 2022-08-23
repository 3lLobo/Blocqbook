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
  const dispatch = useDispatch()
  const [prevAddress, setPrevAddress] = useState(null)
  const [lrInit, setLrInit] = useState(false)

  // Logging webstats
  useEffect(() => {
    if (!lrInit) {
      initLogRocket()
      // // after calling LogRocket.init()
      // setupLogRocketReact(LogRocket);
      setLrInit(true)
    }
  }, [lrInit])

  useEffect(() => {
    if (store.address !== prevAddress && lrInit && store.connected) {
      LogRocket.identify(store.address, {
        name: store.address,
        email: store.address,
      })
      setPrevAddress(store.address)
    }
  }, [store.address, prevAddress, lrInit, store.connected])
}
