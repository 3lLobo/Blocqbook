import { Head } from '../components/Head'
import Image from 'next/image'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { MyButton } from '../components/Buttons/MyButton'
import Link from 'next/link'

import { useViewerRecord } from '@self.id/react'
import { useEffect, useState } from 'react'

import ethLogo from '../public/eth_org_logo.svg'
import blocqbookTextTransparent from '../public/blocqBookLogo/logoText/blocqbookTextTransparent.png'
export default function Home() {
  const store = useSelector((state) => state.evm)

  // This is the entrypoint to the users database.
  const record = useViewerRecord(
    'kjzl6cwe1jw147ce8khc2sfyarq74tngnxehvjdxjb0ec472uvucknju7188ntp'
  )

  useEffect(() => {
    if (record.content) {
      console.log('record', record)
    }
  }, [record])

  return (
    <div className="bg-mybg-light dark:bg-mybg-dark">
      <div className=" bg-cover min-h-screen flex flex-col">
        <Head />
        <Header />

        <main className="relative mx-auto max-w-[100%] scrollbar-hide flex-grow place-content-center ">
          {/* <h1 
          className=" dark:text-indigo-50 div-center mt-20 z-20 p-8 font-bold text-4xl text-center  "
          >
            The PhoneBook <br />
            For All Blocqchains
          </h1> */}
          <div
            className='flex justify-center mt-11'
          >
            <img
              // TODO: fix this horrible layout
              // layout='fill'
              width={600}
              // height={2000}
              // src={blocqbookTextTransparent}
              src='/blocqBookLogo/text/blocqbookTextonlyTrans.png'
              alt='eth_org_logo'
            />
          </div>
          {store.connected && (
            <Link href={`/${store.account}`}>
              <div className="flex justify-center">

                <div className="absolute top-3 bg-neonPurple rounded-full hover:cursor-pointer hover:brightness-105 hover:scale-105 transition-all ease-in-out duration-300">
                  {/* <MyButton text="My ☎️ book" primary={true} /> */}
                  <Image
                    // layout='fill'
                    width={200}
                    height={200}
                    src={blocqbookTextTransparent}
                    alt='eth_org_logo'
                  />
                </div>
              </div>
            </Link>
          )}
        </main>
        <footer className="mt-auto mb-0"></footer>
      </div>
    </div>
  )
}
