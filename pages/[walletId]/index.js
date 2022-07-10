import { Head } from '../../components/Head/index'
import Header from '../../components/Header/index'
import Sidebar from '../../components/SideBar'
import ProfileCard from '../../components/ProfileCard'
import { Box, Container } from '@chakra-ui/react'

const Profile = () => {

  return (
    <div className="bg-mybg-light dark:bg-mybg-dark min-h-screen flex flex-col ">
      <Head />
      <Header />
      <Sidebar/>
      <Box className='flex flex-row relative'>
        <Container maxW='80%' className='h-full right-0 absolute'>
          <ProfileCard />
        </Container>
      </Box>     
    </div>
  )
}

export default Profile;