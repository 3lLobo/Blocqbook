//  multiple nullable

import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'



const privateTags = [
  { id: 1, name: 'friendly' },
  { id: 2, name: 'besties' },
  { id: 3, name: 'hanrg' },
  { id: 4, name: 'noFun' },
  { id: 5, name: 'rippedMeOff' },
]

export function PrivTags() {

  const [tags, setTags] = useState(privateTags)
  const [selected, setSelected] = useState([tags[0], tags[1]])
  const [query, setQuery] = useState('')

  const filteredTags =
    query === ''
      ? tags
      : tags.filter((person) =>
        person.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )

  function onSelected(selectedTags) {
    if (selectedTags.length > 2) {
      selectedTags.forEach((tag) => {
        if (!tags.includes(tag)) {
          setTags((prevTags) => [...prevTags, tag])
          setQuery(() => '')
        }
      }
      )
    }
    setSelected(selectedTags)
  }

return (
  <div className="w-72 z-30 ">
    <Combobox value={selected} onChange={onSelected} name="assignee" multiple nullable>
      {selected.length > 0 && (
        <ul
        className='bg-indigo-100 flex flex-row space-x-3 px-3 rounded-md overflow-x-scroll scrollbar-hide'
        >
          {selected.map((person) => (
            <li key={person.id}>{person.name}</li>
          ))}
        </ul>
      )}
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-transparent text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-indigo-900 focus:ring-0"
            displayValue={query}
            // value={query}
            onChange={(event) => {
              event.preventDefault()
              if (event.target.value != '') {
                setQuery(() => event.target.value)
              }
            }}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon
              className="h-5 w-5 text-indigo-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          // afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredTags.length === 0 && query !== '' ? (
              <Combobox.Option
                value={{ id: null, name: query }}
                className="flex flex-row hover:bg-indigo-100 "
              >
                <div className="m-2">
                  Create:
                </div>
                <button
                  onClick={() => { }}
                  className="w-fit bg-indigo-300 rounded-xl flex items-center justify-between px-4 py-2 text-sm  text-indigo-900hover:text-indigo-900 focus:outline-none focus:bg-indigo-100 focus:text-indigo-900"
                  value={query}
                >
                  {query}
                </button>
              </Combobox.Option>
            ) : (
              filteredTags.map((person) => (
                <Combobox.Option
                  key={person.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-indigo-100 text-bold' : 'text-indigo-900'
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
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  </div>
)
}
