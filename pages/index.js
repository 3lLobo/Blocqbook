import { Head } from '../components/Head'
import Image from 'next/image'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { MyButton } from '../components/Buttons/MyButton'
import Link from 'next/link'

import { useViewerRecord } from '@self.id/react'
import { useEffect, useState } from 'react'


export default function Home() {
  const store = useSelector((state) => state.evm)

  // This is the entrypoint to the users database.
  const record = useViewerRecord("kjzl6cwe1jw147ce8khc2sfyarq74tngnxehvjdxjb0ec472uvucknju7188ntp")

  useEffect(() => {
    console.log("record", record)
  }, [record])

  return (
    <div className="bg-mybg-light dark:bg-mybg-dark">
      <div className="bg-hero-pattern bg-cover min-h-screen flex flex-col">
        <Head />
        <Header />

        <main className="mx-auto max-w-[100%] scrollbar-hide flex-grow place-content-center ">
          <h1 className=" dark:text-indigo-50 div-center mt-40 z-20 p-8 font-bold text-6xl text-center ">
            You don{"'"}t have to juggle <br />
            between wallets anymore !
          </h1>
          {store.connected && (
            <Link href={`/${store.account}`}>
            <div className="mx-auto mt-11 justify-center flex">
              <MyButton text="Go back to Block book" primary={true} />
            </div>
            </Link>
          )}
        </main>
        <footer className="mt-auto mb-0"></footer>
      </div>
    </div>
  )
}
