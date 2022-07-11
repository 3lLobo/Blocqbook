import { Transactions } from '../../components/Transactions'
import { Tab } from '@headlessui/react'
import { Fragment, useEffect } from 'react'

import { Layout } from '../../components/Layout'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'




// the personal site showing the transaction and contact tabs, with option to add addresses from the the transaction tab to the contacts.
export default function Book({ address }) {
  const store = useSelector(state => state.evm)
  const dispatch = useDispatch()

  const router = useRouter()

  // Login listener
  useEffect(() => {
    if (!store.connected) {
      // router.push('/')
    } 
  }, [store.connected])

  const tabNames = ['Transactions', 'Contacts', 'Explore', 'Messenger', 'FileTransfer']

  return (
    <Layout>
      <div
      className='mx-auto'
      >

        <Tab.Group>
          <Tab.List
            className='space-x-4 bg-gradient-to-b from-slate-900  p-4 prose rounded-t-xl text-aqua-muted max-w-max'
          >
            {tabNames.map(tabName => (
              <Tab
                key={tabName}
                as={Fragment}
              >
                {({ selected }) => (
                  <button
                    key={tabName}
                    className={
                      'bg-opacity-30 rounded-t-xl px-4 py-2'.concat(' ', selected ? 'bg-aqua text-snow-muted' : 'hover:text-muted hover:text-snow-muted')
                    }
                  >
                    {tabName}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <Transactions />
            </Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
            <Tab.Panel>Content 3</Tab.Panel>
            <Tab.Panel>Content 3</Tab.Panel>
            <Tab.Panel>Content 3</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </Layout>
  )
}
