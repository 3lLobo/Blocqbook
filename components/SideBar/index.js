import { Link } from 'next/link'
import { Tab, Fragment } from '@headlessui/react'
import Header from '../Header'
import {
  BellIcon,
  MenuAlt2Icon,
  MenuAlt3Icon,
  SearchIcon,
} from '@heroicons/react/solid'
import ProfileCard from '../Profile/profileCard'
import { Transactions } from '../Transactions'
import { useState } from 'react'
import { ContactSlices } from '../ContactSlices'


// TODO: Use the React component!!! https://tailwindui.com/components/application-ui/navigation/sidebar-navigation
const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState(1)

  const tabNames = [
    'Transactions',
    'Contacts',
    'Explore',
    'Messenger',
    'FileTransfer',
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
          <div className="flex-1 flex flex-col min-h-0 bg-slate-800 ">
            <div className="flex items-center h-16 flex-shrink-0 bg-slate-900">
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
                        className={'bg-slate-900 text-slate-300 hover:bg-indigo-900 hover:text-snow group flex items-center px-2 py-2 text-sm font-medium rounded-md'.concat(
                          ' ',
                          selected
                            ? 'text-snow bg-indigo-900'
                            : 'text-slate-300'
                        )}
                      >
                        {tabName}
                      </a>
                    )}
                  </Tab>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col">
          <div className=" mx-6 mt-4 rounded-2xl sticky top-2 flex-shrink-0 flex h-11 bg-transparent backdrop-blur-md dark:backdrop-brightness-150 shadow-2xl z-30">
            <button
              type="button"
              className="px-4 border-r border-slate-900 text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon className="h-6 w-6" />
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex">
                <form className="w-full flex md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-slate-400 focus-within:text-slate-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                      <SearchIcon className="h-5 w-5" />
                    </div>
                    <input
                      id="search-field"
                      className="bg-inherit block w-full h-full pl-8 pr-3 border-transparent  text-slate-900 dark:text-snow hover:text-slate-500  placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-0 focus:border-transparent sm:text-sm"
                      placeholder="Search"
                      type="search"
                      name="search"
                    />
                  </div>
                </form>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="bg-indigo-600 dark:bg-indigo-400 p-1 rounded-full text-slate-900 dark:text-snow hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">View notifications</span>
                  {/* <BellIcon 
                  className="h-6 w-6"
                  /> */}
                  {/* Heroicon name: outline/bell */}
                  {/* <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg> */}
                </button>

                {/* Profile dropdown */}
                {/* <div className="ml-3 relative">
                <div>
                  <button type="button" className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span className="sr-only">Open user menu</span>
                    <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  </button>
                </div> */}

                {/*
              Dropdown menu, show/hide based on menu state.

              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            */}
                {/* <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1"> */}
                {/* Active: "bg-slate-100", Not Active: "" */}
                {/* <a href="#" className="block px-4 py-2 text-sm text-slate-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</a>

                  <a href="#" className="block px-4 py-2 text-sm text-slate-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Settings</a>

                  <a href="#" className="block px-4 py-2 text-sm text-slate-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</a>
                </div>
              </div> */}
              </div>
            </div>
          </div>
          <Tab.Panels>
            {tabNames.map((tabName, index) => {
              return (
                <Tab.Panel key={index}>
                  <main className="flex-1">
                    <div className="">
                      {tabName === 'Transactions' ? (
                        <Transactions />
                      ) : tabName === 'Contacts' ? (
                        <ContactSlices />
                      ) : (
                        <ProfileCard />
                      )}
                    </div>
                  </main>
                </Tab.Panel>
              )
            })}
          </Tab.Panels>
        </div>
      </Tab.Group>
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
