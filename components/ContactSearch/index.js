//  multiple nullable

import { Fragment, useEffect, useMemo, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'

export function ContactSearch({ setAddressToSend }) {
  const [query, setQuery] = useState('')
  const router = useRouter()
  const store = useSelector((state) => state.contact)
  const contacts = store.contacts ? Object.values(store.contacts) : []

  const filteredContacts =
    query === ''
      ? contacts
      : contacts.filter((contact) =>
          contact.bio.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  function onSelected(selectedContact) {
    if (selectedContact) {
      router.push(
        {
          pathname: '/rotarydial',
          query: { to: ethers.utils.getAddress(selectedContact.bio.address) },
        },
        { shallow: true }
      )
    }
  }

  return (
    <div className="z-30 w-full flex flex-row-reverse items-center">
      <div className="flex w-full z-40">
        <Combobox onChange={onSelected} name="assignee" nullable>
          <div className="w-full relative mt-1">
            <div className=" w-full relative flex cursor-default overflow-hidden rounded-lg text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
              <Combobox.Input
                className="w-full flex border-none py-2 pl-3 text-sm leading-5 text-indigo-900 focus:ring-0 bg-transparent backdrop-blur-md backdrop-brightness-125 rounded-l-lg dark:text-indigo-100 dark:bg-zinc-800 dark:bg-opacity-80"
                displayValue={query}
                // value={query}
                onChange={(event) => {
                  setQuery(() => event.target.value)
                  setAddressToSend(() => event.target.value)
                }}
              />
            </div>
            <Transition
              as={Fragment}
              // leave="transition ease-in duration-500"
              // leaveFrom="opacity-100"
              // leaveTo="opacity-0"
              enter="transition ease-in duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-1000"
              afterLeave={() => setQuery('')}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto scrollbar-hide rounded-md backdrop-blur-md backdrop-brightness-125 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:text-indigo-100 dark:bg-zinc-800 dark:bg-opacity-80">
                {filteredContacts &&
                  filteredContacts.map((person) => (
                    <Combobox.Option
                      key={person.bio.address}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-5 pr-4 ${
                          active
                            ? 'font-extrabold bg-gray-50'
                            : 'text-indigo-900  dark:text-snow'
                        }`
                      }
                      value={person}
                    >
                      <>
                        <span className="block truncate font-normal">
                          {person.bio.name.toUpperCase()}
                        </span>
                      </>
                    </Combobox.Option>
                  ))}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </div>
  )
}
