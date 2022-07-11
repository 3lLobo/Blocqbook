import { Head } from '../../components/Head/index'
import Header from '../../components/Header/index'
import Sidebar from '../../components/SideBar'
import { Icon, Link } from '@chakra-ui/react'
import { Avatar, Box, Text, IconButton, Container, Tag } from '@chakra-ui/react'

const Dashboard = () => {
  return(
    <div className="bg-mybg-light dark:bg-mybg-dark min-h-screen flex flex-col">
      <Head />
      <Header />
      <Sidebar/>
      <Box className='flex flex-row relative'>
        <Container maxW='80%' className='h-screen right-0 p-5 absolute'>
          <Text fontSize='3xl' fontWeight='semibold' className='text-black dark:text-indigo-50 mb-10'> Contacts </Text>
          <Box borderRadius='xl' className='bg-white dark:bg-slate-800 p-2 flex w-11/12 flex-row gap-3'>
            <Avatar size='sm' name='Dude' className='mx-3'/>
            <Text fontSize='md' className='text-black dark:text-indigo-50 self-center'> Dude </Text>
            <Tag size='sm' className='bg-indigo-100 hover:bg-indigo-600 ml-20 ' variant='solid' >dude.eth</Tag>
            <IconButton 
              icon={<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>} 
              color='#4f46e5'
            />
            <IconButton
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>}
              color='#4f46e5'
            />

          </Box>
        </Container> 

      </Box> 
    </div>
  )
}



export default Dashboard;