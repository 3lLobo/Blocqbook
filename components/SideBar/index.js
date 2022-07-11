import { Link } from '@chakra-ui/react'
import {Box, Button, Tag, Container, VStack } from '@chakra-ui/react'

const Sidebar = () => {
  return(
      <Box className='flex flex-row relative'>
        <Container maxW='20%' className='h-full left-0 absolute grid grid-row gap-1 p-4'>
          <Button 
            size="md" 
            variant="ghost"
            bg="#4f46e5"
            className='font-bold'
          >
            Add Contact
          </Button>
          <Button className='mt-10 text-black dark:text-white' colorScheme='none'>
            <Link href="/dashboard">Dashboard</Link></Button>
          <Button className='text-black dark:text-white' colorScheme='none'>
            <Link href="/profile">Profile</Link></Button>
          <Button className='text-black dark:text-white' colorScheme='none'>Inbox</Button>
          <Button className='text-black dark:text-white' colorScheme='none'>Settings</Button>          
        </Container> 
      </Box>
  )
}

export default Sidebar;