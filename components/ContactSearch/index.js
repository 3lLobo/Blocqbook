//  multiple nullable

import { Fragment, useEffect, useMemo, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Tag } from '../Profile/Tag'
import { getRandomTailwindColor } from '../../lib/randomColors'
import { useDispatch, useSelector } from 'react-redux'
import { updateContact } from '../../app/contactSlice'
import { v4 as uuid } from 'uuid'

// TODO: add these to global/user database
const privateTags = [
  { id: 1, name: 'myContact', color: 'cyan-300' },
  { id: 2, name: 'besties', color: 'purple-400' },
  { id: 3, name: 'favo', color: 'amber-300' },
  { id: 4, name: 'noFun', color: 'fuchsia-400' },
  { id: 5, name: 'rippedMeOff', color: 'red-600' },
]

export function ContactSearch() {
  const store = useSelector((state) => state.contact)
  const contacts = store.contacts ? Object.values(store.contacts) : []
  
  const [selected, setSelected] = useState([])

  const [query, setQuery] = useState('')
  const [newColor, setNewColor] = useState(getRandomTailwindColor())

  const filteredTags =
    query === ''
      ? contacts
      : contacts.filter((tag) =>
          tag.bio.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  function onSelected(selectedTags) {
    console.log('selectedTAUISHDUIASHDUASIDHASHUIags:', selectedTags);
    if (selectedTags.length > 0) {
      selectedTags.forEach((tag) => {
        if (!contacts.includes(tag)) {
          setQuery(() => '')
          setNewColor(() => getRandomTailwindColor())
        }
      })
    }
    setSelected(selectedTags)
  }

  return (
    <div className="z-30 w-full flex flex-row-reverse items-center">
      <div className="flex w-full z-40">
        <Combobox
          value={selected}
          onChange={onSelected}
          name="assignee"
          nullable
        >
          {({ open }) => (
            <div className="w-full relative mt-1">
              <div className=" w-full relative flex cursor-default overflow-hidden rounded-lg text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                  className={` w-full flex border-none py-2 pl-3 text-sm leading-5 text-indigo-900 focus:ring-0 bg-transparent backdrop-blur-md backdrop-brightness-125 rounded-l-lg dark:text-indigo-100 dark:bg-zinc-800 dark:bg-opacity-80`}
                  displayValue={query}
                  // value={query}
                  onChange={(event) => {
                    if (event.target.value === '') {
                      setNewColor(() => getRandomTailwindColor())
                    }
                    setQuery(() => event.target.value)
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
                  {filteredTags &&
                    filteredTags.map((person) => (
                      <Combobox.Option
                        key={person.bio.address}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? ' text-bold'
                              : 'text-indigo-900  dark:text-snow'
                          }`
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {person.bio.name}
                            </span>
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                </Combobox.Options>
              </Transition>
            </div>
          )}
        </Combobox>
      </div>
    </div>
  )
}
