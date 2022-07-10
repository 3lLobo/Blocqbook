import { Head } from '../../components/Head/index'
import Header from '../../components/Header/index'
import Sidebar from '../../components/SideBar'
import { Link } from '@chakra-ui/react'
import { Avatar, Box, Text, Button, Container, VStack } from '@chakra-ui/react'

const Dashboard = () => {
  return(
    <div className="bg-mybg-light dark:bg-mybg-dark min-h-screen flex flex-col">
      <Head />
      <Header />
      <Sidebar/>
      <Box className='flex flex-row relative'>
        <Container maxW='80%' className='bg-black h-screen right-0 absolute'>
          hey
        </Container> 
      </Box>
      
    </div>
  )
}



export default Dashboard;