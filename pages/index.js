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
import GithubFooter from '../components/GithubFooter'
// import { tagAdrsAwsApi } from '../lib/aws/apigClient'


export default function Home() {
  const store = useSelector((state) => state.evm)

  return (
    <div className="bg-mybg-light dark:bg-mybg-dark">
      <div className=" bg-cover min-h-screen flex flex-col">
        <Head />
        <Header />

        <main className="relative mx-auto w-full max-w-2xl scrollbar-hide flex flex-col my-auto  ">
          <div className=" mx-auto w-full h-60 bg-logo-black dark:bg-logo-indigo bg-cover bg-center" />
          <div className="sm:mt-11 mx-auto w-1/2 h-32 bg-catch-phrase bg-cover bg-center" />
        </main>
        <footer className="mt-auto mb-0">
          {/* <button
            onClick={() => tagAdrsAwsApi({ address: "0x1bcA0600F48FBF09aEE9B6C7279c31311da11Bac", tag: "11", mode: "add" })}
          >
            ClickMe
          </button> */}
          <GithubFooter />
        </footer>
      </div>
    </div>
  )
}
