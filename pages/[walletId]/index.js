import { Head } from '../../components/Head/index'
import Header from '../../components/Header/index'
import Sidebar from '../../components/SideBar'
import ProfileCard from '../../components/Profile/profileCard'

const Profile = () => {
  return (
    <div className="bg-mybg-light dark:bg-mybg-dark min-h-screen flex flex-col ">
      <Head />
      <Sidebar />
    </div>
  )
}

export default Profile
