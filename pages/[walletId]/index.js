import { Head } from '../../components/Head/index'
import Header from '../../components/Header/index'
import Sidebar from '../../components/SideBar'
import ProfileCard from '../../components/Profile/profileCard'
import { useViewerRecord } from '@self.id/react'
import { useDispatch, useSelector } from 'react-redux'
import { setContacts } from '../../app/contactSlice'
import { useEffect } from 'react'
import { dummyProfile } from '../../components/Profile/profileCard'


const Profile = () => {

  // This is the entrypoint to the users database.
  const record = useViewerRecord("kjzl6cwe1jw147ce8khc2sfyarq74tngnxehvjdxjb0ec472uvucknju7188ntp")
  const store = useSelector((state) => state.contact)
  const evmStore = useSelector((state) => state.evm)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("record", record)
    if (!store.hasInitialRecord && evmStore.connected) {
      dispatch(setContacts({ contacts: record.content?.contacts, isInitialRecord: true }))
    }
  }, [record, evmStore.connected, store.hasInitialRecord, dispatch])

//   async function clickContacts() {
//     record.set({
//       'contacts': {
//       '0x3ECC53F7Ba45508483379bd76989A3003E6cbf09' : dummyProfile('wolf', store.account),
//       '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': dummyProfile('Crypto'),
//         '0xd9a51042eBE9A428e362B36F12Bd332bB565deEa': dummyProfile('Panda'),
//   },
// })
//   }

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
