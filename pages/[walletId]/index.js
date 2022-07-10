import { Head } from '../../components/Head/index'
import Header from '../../components/Header/index'
import { Avatar, Box, Text, Button, Tag, Input, Textarea, HStack } from '@chakra-ui/react'

const Profile = () => {

  return (
    <div className="bg-mybg-light dark:bg-mybg-dark min-h-screen flex flex-col ">
      <Head />
      <Header />
      <Box 
        w='80%' 
        borderRadius='md'
        className='border-2 self-center grid justify-items-center m-8 p-4 shadow-lg'
      >
        <Avatar 
          size='2xl' 
          name='Dude' 
          className='m-4'
        />
        <Text fontSize='2xl' fontWeight='bold' className='text-black dark:text-indigo-50'> Dude </Text>
        <Tag className='bg-indigo-500 hover:bg-indigo-600 ' variant='solid' >0xd9a51042eBE9A428e362B36F12Bd332bB565deEa</Tag>
          <Text fontSize='lg' fontWeight='semibold' className='text-gray dark:text-indigo-50 p-6'> About me</Text>
          <Textarea className='border-2' variant='filled' placeholder='I like to..'/>
        <Button 
          size="md" 
          variant="ghost"
          bg="#4f46e5"
          className='font-bold m-4 mx-[40%]'
        >
          Save
        </Button>

        
      </Box>
      
      
    </div>
  )
}

export default Profile;