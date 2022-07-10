import { Head } from '../components/Head'
import Image from 'next/image'
import Header from '../components/Header'
import { Button, Text } from '@chakra-ui/react'
import { MyButton } from '../components/Buttons/MyButton'
import { useState } from 'react'

export default function Home() {

  return (
    <div className="bg-mybg-light dark:bg-mybg-dark min-h-screen flex flex-col ">
      <Head />
      <Header />

      <main className="mx-auto max-w-[100%] scrollbar-hide flex-grow opacity-80 place-content-center">
        <Text fontSize='6xl' className="text-black dark:text-indigo-50 text-center mt-20 z-20 p-8 font-bold">
          You don't have to juggle <br/>between wallets anymore !
        </Text>
        <Button 
          size="lg" 
          variant="ghost"
          bg="#4f46e5"
          className='font-bold z-10 mx-[40%]'
        >
          Connect
        </Button>
        <Image
          layout='fill'
          src="/hero.svg"
          className='z-0'
        />
      </main>

      <footer className="mt-auto mb-0">

      </footer>
    </div>
  )
}
