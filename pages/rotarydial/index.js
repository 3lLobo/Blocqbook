import { Head } from '../../components/Head/index'
import Header from '../../components/Header/index'
import Sidebar from '../../components/SideBar'
import ProfileCard from '../../components/Profile/ProfileCard'
import { useViewerRecord } from '@self.id/react'
import { useDispatch, useSelector } from 'react-redux'
import { setContacts, setSyncedCeramic } from '../../app/contactSlice'
import { useCallback, useEffect, useRef } from 'react'
import { dummyProfile } from '../../components/Profile/ProfileCard'
import ProfileModal from '../../components/ProfileModal'
import { WalletProvider } from '../../xmtp/components/WalletProvider.tsx'

const Profile = () => {
  // This is the entrypoint to the users database.
  const record = useViewerRecord(
    'kjzl6cwe1jw147ce8khc2sfyarq74tngnxehvjdxjb0ec472uvucknju7188ntp'
  )
  const store = useSelector((state) => state.contact)
  const evmStore = useSelector((state) => state.evm)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!store.hasInitialRecord && evmStore.connected && record.content) {
      console.log('Ceramic record loaded: ', record)
      dispatch(
        setContacts({
          contacts: record.content?.contacts,
          isInitialRecord: true,
        })
      )
    } else if (
      !store.isSyncedCeramic &&
      store.hasInitialRecord &&
      evmStore.connected
    ) {
      record.set({ contacts: store.contacts })
      dispatch(setSyncedCeramic({ isSyncedCeramic: true }))
    }
  }, [
    record,
    evmStore.connected,
    dispatch,
    store.contacts,
    store.hasInitialRecord,
    store.isSyncedCeramic,
  ])

  // async function clickContacts() {
  //   record.set({
  //     'contacts': {
  //       '0x3ecc53f7ba45508483379bd76989a3003e6cbf09': dummyProfile('wolf', store.account),
  //       '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': dummyProfile('Crypto'),
  //       '0xd9a51042eBE9A428e362B36F12Bd332bB565deEa': dummyProfile('Panda'),
  //     },
  //   })
  // }

  return (
    <WalletProvider>
      <div className="bg-mybg-light dark:bg-mybg-dark min-h-screen flex flex-col ">
        <Head />
        {/* <button className="bg-mybg-light dark:bg-mybg-dark min-h-screen flex flex-col " onClick={clickContacts} >
        ClickMEEE
      </button> */}
        <Sidebar />
        <ProfileModal />
      </div>
    </WalletProvider>
  )
}

export default Profile
