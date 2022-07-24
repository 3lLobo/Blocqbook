import { Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useRouter } from 'next/router'

type ConversationViewProps = {
  children?: React.ReactNode
}

const ConversationView = ({ children }: ConversationViewProps): JSX.Element => {
  const router = useRouter()
  const show = router.pathname !== '/'

  return (
    <>
      <Transition.Root show={show} as={Fragment}>
        {/* <div className="inset-0 flex flex-col h-screen bg-white "> */}
        <div className="flex flex-col h-screen ">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            {/* <div className="relative flex-1 flex flex-col w-full"> */}
            <div className="relative ml-96 flex-1 flex flex-col w-full">
              {children}
            </div>
          </Transition.Child>
        </div>
      </Transition.Root>

      {/* Always show in desktop layout */}
      <div className=" pl-84 flex flex-col flex-1 h-screen overflow-y-auto">
        {children}
      </div>
    </>
  )
}

export default ConversationView
