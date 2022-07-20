import { Head } from '../components/Head'
import Image from 'next/image'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { MyButton } from '../components/Buttons/MyButton'
import Link from 'next/link'

import { useViewerRecord } from '@self.id/react'
import { useEffect, useState } from 'react'

import blocqbookLogo from '../public/blocqBookLogo/logoText/blocqbookTextTransparentBanner.png' 
import blocqbookTextTransparent from '../public/blocqBookLogo/logoText/blocqbookTextTransparent.png'
export default function Home() {
  const store = useSelector((state) => state.evm)

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
          <div className="flex flex-col justify-center mt-11">
            {store.connected && (
              <Link href={`/${store.account}`}>
                <div className="flex justify-center">
                  <div 
                  // TODO: make this button rounded
                  className="mx-5 relative flex flex-grow max-w-xl h-24 rounded-full bg-neonPurple dark:bg-[#441B94] hover:cursor-pointer hover:brightness-105 hover:scale-105 transition-all ease-in-out duration-300"
                  style={{width: '100%', }}
                  >
                    <Image
                      layout='fill'
                      // width={200}
                      // height={200}
                      src={blocqbookLogo}
                      alt="bannerButton"
                    />
                  </div>
                </div>
              </Link>
            )}
            <img
              // TODO: fix this horrible layout
              // layout='fill'
              width={630}
              // height={2000}
              // src={blocqbookTextTransparent}
              src={store.connected
                ? "/blocqBookLogo/text/blocqbookTextonlyTrans.png"
                : "/blocqBookLogo/text/blocqbookTextTransparent.png"}
              alt="eth_org_logo"
            />
          </div>
        </main>
        <footer className="mt-auto mb-0"></footer>
      </div>
    </div>
  )
}
