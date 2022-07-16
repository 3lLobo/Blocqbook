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
import { ContactSlice } from '../Profile/contactSlice'


// TODO: Use the React component!!! https://tailwindui.com/components/application-ui/navigation/sidebar-navigation
const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const tabNames = [
    'Transactions',
    'Contacts',
    'Profile',
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
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed h-full backdrop-blur-xl backdrop-brightness-50">
          <div className="flex-1 flex flex-col min-h-0 bg-zinc-50 dark:bg-zinc-800 ">
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1 flex flex-col ">
                {tabNames.map((tabName) => (
                  <Tab as={Fragment} key={tabName}>
                    {({ selected }) => (
                      <a
                        key={tabName}
                        href="#"
                        className={'hover:bg-indigo-600 hover:text-white group flex items-center px-4 py-4 text-sm font-large font-medium rounded-md'.concat(
                          ' ',
                          selected
                            ? 'text-white bg-indigo-600'
                            : 'text-zinc-900 dark:text-zinc-300'
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
              className="px-4 border-r border-zinc-900 text-zinc-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
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
                  <div className="relative w-full text-zinc-400 focus-within:text-zinc-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                      <SearchIcon className="h-5 w-5" />
                    </div>
                    <input
                      id="search-field"
                      className="bg-inherit block w-full h-full pl-8 pr-3 border-transparent  text-zinc-900 dark:text-snow hover:text-zinc-500  placeholder-zinc-500 focus:outline-none focus:placeholder-zinc-400 focus:ring-0 focus:border-transparent sm:text-sm"
                      placeholder="Search"
                      type="search"
                      name="search"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Tab.Panels>
            {tabNames.map((tabName, index) => {
              return (
                <Tab.Panel key={index}>
                  <main className="flex-1">
                    <div className="">
                      {tabName === 'Transactions' && <Transactions />}
                      {tabName === 'Contacts' && <ContactSlice />}
                      {tabName === 'Profile' && <ProfileCard />}
                    </div>
                  </main>
                </Tab.Panel>
              )
            })}
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  )
}

export default Sidebar
