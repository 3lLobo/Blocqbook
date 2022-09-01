import { Head } from '../../components/Head/index'
import Sidebar from '../../components/SideBar'
import { useViewerRecord } from '@self.id/react'
import { useDispatch, useSelector } from 'react-redux'
import { setContacts, setSyncedCeramic } from '../../app/contactSlice'
import { useCallback, useEffect, useRef } from 'react'
import ProfileModal from '../../components/ProfileModal'
import GithubFooter from '../../components/GithubFooter'
import Image from 'next/image'
import { useLazyGetAllTokenBalancesQuery } from '../../app/covApi'
import { skipToken } from '@reduxjs/toolkit/dist/query'

const Profile = () => {
  // This is the entrypoint to the users database.
  const record = useViewerRecord(
    'kjzl6cwe1jw147ce8khc2sfyarq74tngnxehvjdxjb0ec472uvucknju7188ntp'
  )
  const store = useSelector((state) => state.contact)
  const evmStore = useSelector((state) => state.evm)
  const dispatch = useDispatch()

  const [covTrigger, covResult, covInfo] = useLazyGetAllTokenBalancesQuery()

  useEffect(() => {
    console.log('Ceramic record: ', record)
    if (!store.hasInitialRecord && evmStore.connected && !record.isLoading) {
      console.log('Ceramic record loaded!')
      const address = evmStore.account
      covTrigger( address 
        ? { address }
        : skipToken
        , true)
      dispatch(
        setContacts({
          // contacts: myContacts,
          contacts: record.content?.contacts || {},
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

  return (
    <>
      <div className="bg-mybg-light dark:bg-mybg-dark min-h-screen flex flex-col ">
        <Head />
        {/* <button className="bg-mybg-light dark:bg-mybg-dark min-h-screen flex flex-col " onClick={clickContacts} >
        ClickMEEE
      </button> */}
        <Sidebar />
        <ProfileModal />
      </div>
      <div
        // TODO: position the image.
        className="absolute bottom-0 md:w-64 mb-0 flex flex-col z-0"
      >
        <div className="relative w-20 aspect-1 mx-auto dark:hidden">
          <Image
            layout="fill"
            alt="pbLogo"
            src="/blocqBookLogo/icon/blocqbookTransparent2.png"
          />
        </div>
        <GithubFooter />
      </div>
    </>
  )
}

export default Profile
