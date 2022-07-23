//  multiple nullable

import { Fragment, useEffect, useMemo, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Tag } from './Tag'
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

export function PrivTags() {
  const store = useSelector((state) => state.contact)
  const dispatch = useDispatch()

  const getTagList = () => {
    // filter out the objects whos ids occur twice in the array of tags
    const uniqueTags = store.contactInEdit.tags.privTags.filter((tag) => {
      if (!privateTags.map((t) => t.id).includes(tag.id)) {
        return tag
      }
    })
    return [...privateTags, ...uniqueTags]
  }

  // Need to use the same input source for the list of tags.
  const [tags, setTags] = useState(() => getTagList())
  const [selected, setSelected] = useState(() =>
    getTagList().filter((tag) => {
      if (store.contactInEdit.tags.privTags.map((t) => t.id).includes(tag.id)) {
        return tag
      }
    })
  )

  const [query, setQuery] = useState('')
  const [newColor, setNewColor] = useState(getRandomTailwindColor())

  const filteredTags =
    query === ''
      ? tags
      : tags.filter((tag) =>
        tag.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )

  function onSelected(selectedTags) {
    if (selectedTags.length > 0) {
      selectedTags.forEach((tag) => {
        if (!tags.includes(tag)) {
          setTags((prevTags) => [...prevTags, tag])
          setQuery(() => '')
          setNewColor(() => getRandomTailwindColor())
        }
      })
    }
    setSelected(selectedTags)
    dispatch(
      updateContact({
        field1: 'tags',
        field2: 'privTags',
        value: selectedTags,
      })
    )
  }

  return (
    <div className="z-30 w-full flex flex-row-reverse items-center">
      <div className="flex flex-grow justify-between items-center mr-auto ml-1">
        {selected.length > 0 && (
          <ul className=" py-2 flex flex-row space-x-1 px-3 rounded-md overflow-x-scroll scrollbar-hide">
            {selected.map((person) => (
              <li key={person.id}>
                <Tag tagText={person.name} color={person.color} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex w-full z-40  ">
        <Combobox
          value={selected}
          onChange={onSelected}
          name="assignee"
          multiple
          nullable
        >
          {({ open }) => (
            <div className="relative mt-1">
              <div className="relative flex cursor-default overflow-hidden rounded-lg text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                  className={`${!open && 'hidden'
                    } flex border-none py-2 pl-3 text-sm leading-5 text-indigo-900 focus:ring-0 bg-transparent backdrop-blur-md backdrop-brightness-125 rounded-l-lg dark:text-indigo-100 dark:bg-zinc-800 dark:bg-opacity-80`}
                  displayValue={query}
                  // value={query}
                  onChange={(event) => {
                    if (event.target.value === '') {
                      setNewColor(() => getRandomTailwindColor())
                    }
                    setQuery(() => event.target.value)
                  }}
                />
                <Combobox.Button className="relative w-fit cursor-default rounded-lg py-2 px-1 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <SelectorIcon
                    className="h-5 w-5 text-indigo-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
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
                  {!filteredTags?.map((fTag) => fTag.name).includes(query) &&
                    query !== '' && (
                      <Combobox.Option
                        value={{
                          id: uuid(),
                          name: query,
                          color: newColor,
                        }}
                        className="flex flex-row "
                      >
                        <div className="m-2">Create:</div>
                        <button
                          onClick={() => { }}
                          className="w-fit flex items-center justify-between "
                          value={query}
                        >
                          <Tag tagText={query} color={newColor} />
                        </button>
                      </Combobox.Option>
                    )}
                  {filteredTags &&
                    filteredTags.map((person) => (
                      <Combobox.Option
                        key={person.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${active
                            ? ' text-bold'
                            : 'text-indigo-900  dark:text-snow'
                          }`
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                }`}
                            >
                              {person.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-semibold' : 'text-teal-600'
                                  }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
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
