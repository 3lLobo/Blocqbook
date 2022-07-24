import { Link } from 'next/link'
import { Tab, Fragment } from '@headlessui/react'
import Header from '../Header'
import {
  BellIcon,
  MenuAlt2Icon,
  MenuAlt3Icon,
  SearchIcon,
} from '@heroicons/react/solid'
import ProfileCard from '../Profile/ProfileCard'
import { Transactions } from '../Transactions'
import { useState } from 'react'
import { ContactSlices } from '../ContactSlices'
import FileTransfer from '../FileTransfer'
import Image from 'next/image'
import Messenger from '../Messenger'
import { CurrencyDollarIcon } from '@heroicons/react/outline'

// TODO: Use the React component!!! https://tailwindui.com/components/application-ui/navigation/sidebar-navigation
const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState(1)

  const tabNames = [
    { name: 'Transactions',
      icon: <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>},
    { name: 'Contacts',
      icon: <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>},
    { name: 'Messenger',
      icon: <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>},
    { name: 'FileTransfer',
      icon: <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>},
  ]

  return (
    <div className="h-full">
      <Tab.Group
        vertical
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
      >
        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed h-full backdrop-blur-xl backdrop-brightness-50">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 bg-white shadow-lg dark:bg-[#0E0026] ">
            <div className="flex items-center h-16 bg-white dark:bg-[#0E0026] ">
              {/* <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow" /> */}
              <Header />
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1 flex flex-col ">
                {/* Current: "bg-slate-900 text-white", Default: "text-slate-300 hover:bg-slate-700 hover:text-white" */}
                {/*
            Heroicon name: outline/home

            Current: "text-slate-300", Default: "text-slate-400 group-hover:text-slate-300"
          */}
                {/* <svg className="text-slate-300 mr-3 flex-shrink-0 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg> */}
                {tabNames.map((tabName) => (
                  <Tab as={Fragment} key={tabName}>
                    {({ selected }) => (
                      <a
                        key={tabName}
                        href="#"
                        className={`dark:text-slate-300 hover:bg-[#270067] hover:text-snow group flex gap-4 items-center px-3 p-3 text-sm font-medium rounded-md`.concat(
                          ' ',
                          selected
                            ? 'text-white bg-[#270067]'
                            : 'text-slate-500'
                        )}
                      >
                        {tabName.icon}
                        {tabName.name}
                      </a>
                    )}
                  </Tab>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="md:pl-64 mt-10 flex flex-col">
          <Tab.Panels>
            {tabNames.map((tabName, index) => {
              return (
                <Tab.Panel key={index}>
                  <main className="flex-1">
                    <div className="">
                      {tabName.name === 'Transactions' ? (
                        <Transactions />
                      ) : tabName.name === 'Contacts' ? (
                        <ContactSlices setSelectedIndex={setSelectedIndex} />
                      ) : tabName.name === 'Messenger' ? (
                        <Messenger />
                      ) : tabName.name === 'FileTransfer' ? (
                        <FileTransfer />
                      ) : (
                        // <ProfileCard />
                        <div>TODO</div>
                      )}
                    </div>
                  </main>
                </Tab.Panel>
              )
            })}
          </Tab.Panels>
        </div>
      </Tab.Group>
      {/* <div
      // TODO: position the image.
        className='relative flex flex-grow w-64 h-64 aspect-1 mt-11'
      >
        <Image
          layout='fill'
          alt='pbLogo'
          src='/blocqBookLogo/icon/blocqbookTransparent2.png'
        />
      </div> */}
    </div>

    // <div className='flex flex-row relative'>
    //   <div className='h-full left-0 absolute grid grid-row gap-1 p-4 max-w-xs'>
    //     <button
    //       // size="md"
    //       // variant="ghost"
    //       // bg="#4f46e5"
    //       className='font-bold'
    //     >
    //       Add Contact
    //     </button>
    //     {/* <button className='mt-10 text-black dark:text-white' colorScheme='none'> */}
    //       {/* <Link href="/dashboard">Dashboard</Link></button> */}
    //     {/* <button className='text-black dark:text-white' colorScheme='none'> */}
    //       {/* <Link href="/profile">Profile</Link></button> */}
    //     <button className='text-black dark:text-white' colorScheme='none'>Indiv</button>
    //     <button className='text-black dark:text-white' colorScheme='none'>Settings</button>
    //   </div>
    // </div>
  )
}

export default Sidebar
