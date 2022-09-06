import { Link } from 'next/link'
import { Tab, Fragment } from '@headlessui/react'
import Header from '../Header'
import {
  BellIcon,
  MenuAlt2Icon,
  MenuAlt3Icon,
  SearchIcon,
} from '@heroicons/react/solid'
import { Transactions } from '../Transactions'
import { useState } from 'react'
import { ContactSlices } from '../ContactSlices'
import FileTransfer from '../FileTransfer'
import Messenger from '../Messenger'
import { useDispatch, useSelector } from 'react-redux'
import { CurrencyDollarIcon } from '@heroicons/react/outline'
import { setOpenTab } from '../../app/navSlice'
import { v4 } from 'uuid'

// TODO: Use the React component!!! https://tailwindui.com/components/application-ui/navigation/sidebar-navigation
const Sidebar = () => {
  const navStore = useSelector((state) => state.nav)
  const dispatch = useDispatch()
  const [selectedIndex, setSelectedIndex] = useState(1)

  function onTabChange(index) {
    dispatch(setOpenTab({ tab: index }))
    setMobileMenu(false)
  }

  const [mobileMenu, setMobileMenu] = useState(false)
  function toggleMobileMenu() {
    console.log("Mobile: ", mobileMenu)
    setMobileMenu((prevState) => !prevState)
  }

  const tabNames = [
    {
      name: 'Transactions',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      name: 'Contacts',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      name: 'Messenger',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
    },
    {
      name: 'FileTransfer',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
          />
        </svg>
      ),
    },
  ]

  return (
    <div className="flex flex-col flex-initial flex-nowrap overflow-y-scroll h-screen scrollbar-hide">
      <Tab.Group
        vertical
        selectedIndex={navStore.openTab}
        onChange={onTabChange}
      >
        <div className={mobileMenu ? "flex" : "hidden" + " md:flex md:w-64 md:flex-col md:fixed h-full backdrop-blur-xl backdrop-brightness-50 "}>
          <div className="flex-1 flex flex-col min-h-0 bg-indigo-100 shadow-lg dark:bg-[#0E0026] ">
            <div className="flex items-center h-16 flex-shrink-0">
              <Header />
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1 flex flex-col ">
                {tabNames.map((tabName) => (
                  <Tab as={Fragment} key={v4()}>
                    {({ selected }) => (
                      <a
                        key={tabName}
                        href="#"
                        className={`dark:text-slate-4000 hover:bg-violet-400 dark:hover:bg-[#270067] hover:text-snow group flex gap-2 items-center px-3 py-6 text-sm font-medium rounded-md`.concat(
                          ' ',
                          selected
                            ? 'text-indigo-100 bg-violet-400 dark:bg-[#270067]'
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
        <div className="md:pl-64 flex flex-col ">
          {([0, 1,].includes(navStore.openTab) && !mobileMenu) && (
            <div className=" mx-6  rounded-2xl sticky top-2 flex-shrink-0 flex h-11 bg-transparent backdrop-blur-md dark:backdrop-brightness-150 shadow-2xl z-30">
              <button
                type="button"
                className="px-4 border-r border-slate-900 text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={toggleMobileMenu}
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
                  </button>
                </div>
              </div>
            </div>
          )}
          <Tab.Panels>
            {tabNames.map((tabName, index) => {
              return (
                <Tab.Panel key={index}>
                  <main className="flex-1">
                    <div className="">
                      {tabName.name === 'Transactions' ? (
                        <Transactions />
                      ) : tabName.name === 'Contacts' ? (
                        <ContactSlices />
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
    </div>
  )
}

export default Sidebar
