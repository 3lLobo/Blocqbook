import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal, openModal } from '../../app/contactSlice'
import ProfileCard from '../Profile/ProfileCard'

export default function ProfileModal({ children }) {
  let [isOpen, setIsOpen] = useState(false)

  const store = useSelector((state) => state.contact)
  const dispatch = useDispatch()

  useEffect(() => {
    if (store.modalOpen) {
      onOpen()
    }
  }, [store.modalOpen])

  async function onClose(saveContact) {
    setIsOpen(false)
    setTimeout(() => {
      dispatch(closeModal({ saveContact }))
    }, 500)
  }

  function onOpen() {
    setIsOpen(true)
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 dark:backdrop-brightness-150 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-indigo-50 dark:bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all">
                  <div className="mt-2">
                    {store.contactInEdit && (
                      <ProfileCard profile={store.contactInEdit} />
                    )}
                  </div>
                  <div className="flex flex-row-reverse justify-between items-center">
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-orange-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => onClose(false)}
                      >
                        Close
                      </button>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        // TODO: delete contact instead of close
                        onClick={() => onClose(true)}
                      >
                        Save!
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
