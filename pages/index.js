import { Head } from '../components/Head'
import Image from 'next/image'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { setConnection } from '../app/evmSlice'
import { MyButton } from '../components/Buttons/MyButton'
import Link from 'next/link'
import { Layout } from '../components/Layout'


  
import { Button, Text } from '@chakra-ui/react'
import { useState } from 'react'

export default function Home() {

  const store = useSelector(state => state.evm)
  const dispatch = useDispatch()

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
        {store.connected
          &&
          <div
            className='mx-auto mt-11 bg-navy-muted dark:bg-opacity-0 p-3 rounded-xl'
          >
            <Link
              href={`/book/${store.account}`}>
              <MyButton
                text="My ☎️ book"
              />
            </Link>
          </div>
        }
      </main>
      <footer className="mt-auto mb-0">
      </footer>
    </div>
  )
}
