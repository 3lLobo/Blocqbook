import { Head } from '../../components/Head/index'
import Header from '../../components/Header/index'
import Sidebar from '../../components/SideBar'
import ProfileCard from '../../components/Profile/profileCard'
import { useViewerRecord } from '@self.id/react'
import { useDispatch, useSelector } from 'react-redux'
import { setContacts } from '../../app/evmSlice'
import { useEffect } from 'react'
import { dummyProfile } from '../../components/Profile/profileCard'


const Profile = () => {

  // This is the entrypoint to the users database.
  const record = useViewerRecord("kjzl6cwe1jw147ce8khc2sfyarq74tngnxehvjdxjb0ec472uvucknju7188ntp")
  const store = useSelector((state) => state.evm)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("record", record)
    if (!store.hasInitialRecord && store.connected) {
      dispatch(setContacts({contacts: record.content?.contacts, isInitialRecord: true}))
    }
  }, [record, store.connected, store.hasInitialRecord, dispatch])
  
  // async function clickContacts() {
  //   record.merge({ contacts: [dummyProfile('wolf', store.account), dummyProfile('Crypto'), dummyProfile('Panda')] })
  //   dispatch(setContacts({contacts: record.content.contacts}))
  // }

  return (
    <div className="bg-mybg-light dark:bg-mybg-dark min-h-screen flex flex-col ">
      <Head />
      {/* <button className="bg-mybg-light dark:bg-mybg-dark min-h-screen flex flex-col " onClick={clickContacts} >
        ClickMEEE
      </button> */}
      <Sidebar />
    </div>
  )
}

export default Profile
