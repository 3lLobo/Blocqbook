import { Avatar } from '../Profile/Avatar'
import { Tag } from '../Profile/Tag'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal, deleteContact, openModal } from '../../app/contactSlice'
import { useState } from 'react'
import { ConfirmDelete } from './ConfirmDelete'
import Image from 'next/image'
import { CommonCheck } from '../Poap/CommonCheck'
import { useRouter } from 'next/router'
import { v4 } from 'uuid'
import { setOpenTab } from '../../app/navSlice'
import { ethers } from 'ethers'

export const Slice = ({ contact }) => {
  const store = useSelector((state) => state.contact)
  const navStore = useSelector((state) => state.nav)
  const dispatch = useDispatch()

  function onTabChange(index) {
    dispatch(setOpenTab({ tab: index }))
  }

  const router = useRouter()

  const [openConfirm, setOpenConfirm] = useState(false)

  function onContactClick() {
    dispatch(openModal({ address: contact.bio.address }))
  }

  const handleTabSwitch = (tab) => {
    router.push(
      {
        pathname: '/rotarydial',
        query: { to: ethers.utils.getAddress(contact.bio.address) },
      },
      { shallow: true }
    )
    dispatch(setOpenTab({ tab: tab, query: contact.bio.address }))
  }

  return (
    <>
      <ConfirmDelete
        open={openConfirm}
        setOpen={setOpenConfirm}
        onConfirm={() => {
          dispatch(deleteContact({ address: contact.bio.address }))
        }}
      />
      <div className="bg-indigo-50 dark:bg-[#270067] shadow-md dark:text-snow p-2 mx-6 my-2 max-w-11/12 flex-row gap-3 rounded-xl grid grid-cols-11  justify-start items-center  text-slate-900  ">
        <div
          onClick={onContactClick}
          className="w-full col-span-1 flex flex-row"
        >
          <div className="relative w-10 aspect-1 hover:scale-105 transition-all duration-300 transform-gpu hover:cursor-pointer ">
            <Avatar src={contact.bio.avatar} />
          </div>
          <div className="relative w-10 aspect-1 dark:hue-rotate-180 dark:invert">
            {contact.poap.poaps.length > 0 && (
              <div
              // className='relative'
              >
                <Image
                  className=""
                  layout="fill"
                  src="/poap-badge.png"
                  alt="poapbadge"
                  title="This contact has POAPs."
                />
                {contact.poap.hasCommonPoap && (
                  <span className="absolute top-0 right-0 block h-1/3 w-1/3 rounded-full ring-2 ring-snow dark:ring-zinc-800 bg-neonPurple">
                    <CommonCheck />
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={onContactClick}
          className="mr-11 col-span-2 self-center hover:text-neonPurple dark:hover:text-snow dark:hover:opacity-100 dark:opacity-70 font-medium transition-all duration-300 transform-gpu text-left"
        >
          {contact.bio.name || contact.address}
        </button>
        <div className="space-x-1 col-span-3 flex flex-row h-full items-center px-1 justify-start overflow-x-scroll scrollbar-hide">
          {contact.tags.privTags.map((tag) => (
            <Tag tagText={tag.name} color={tag.color} key={tag.id} />
          ))}
        </div>
        <div className="space-x-1 col-span-2 flex flex-row h-full items-center pl-1 justify-start overflow-x-scroll scrollbar-hide ">
          {contact.tags.pubTags.map((tag) => (
            <Tag tagText={tag.name} color={tag.color} key={v4()} isPub={true} />
          ))}
        </div>
        <div className="flex justify-center col-span-2 gap-x-1 ">
          <button
            onClick={() => {
              handleTabSwitch(2)
            }}
            className="rounded-lg bg-slate-900 dark:bg-snow p-2 bg-opacity-10 dark:bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 stroke-indigo-600 dark:stroke-indigo-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              {' '}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>
          <button
            onClick={() => handleTabSwitch(3)}
            className="rounded-lg bg-slate-900 dark:bg-snow p-2 bg-opacity-10 dark:bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-20"
          >
            {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 stroke-indigo-600 dark:stroke-indigo-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg> */}
            <svg
              height="196"
              viewBox="0 0 169 196"
              className="h-6 w-6 stroke-indigo-600 dark:stroke-indigo-100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none">
                <path
                  d="m.3 146 84 48.5 84-48.5v-97l-84-48.5-84 48.5z"
                  fill="#469ea2"
                />
                <path
                  d="m75.7 12.1-61 35.2c.0999862 1.0977279.0999862 2.2022721 0 3.3l60.9 35.2c5.1404674-3.8005698 12.1595326-3.8005698 17.3 0l60.9-35.2c-.099986-1.0977279-.099986-2.2022721 0-3.3l-60.8-35.2c-5.1404674 3.8005698-12.1595326 3.8005698-17.3 0zm84 48.2-61 35.6c.6781079 6.333528-2.7916258 12.385389-8.6 15l.1 70c.986199.434978 1.9245643.971186 2.8 1.6l60.9-35.2c-.678108-6.333528 2.791626-12.385389 8.6-15v-70.4c-.974881-.4570934-1.911257-.9921657-2.8-1.6zm-150.8.4c-.87543567.6288135-1.81380101 1.1650223-2.8 1.6v70.4c5.8882155 2.52578 9.3951061 8.642449 8.6 15l60.9 35.2c.8754357-.628814 1.813801-1.165022 2.8-1.6v-70.4c-5.8882155-2.52578-9.3951061-8.642449-8.6-15z"
                  fill="#6acad1"
                />
                <path
                  d="m84.3 11 75.1 43.4v86.7l-75.1 43.4-75.1-43.4v-86.8zm0-10.3-84 48.5v97l84 48.5 84-48.5v-97z"
                  fill="#469ea2"
                />
                <path
                  d="m84.9 114.000051h-1.2c-4.167157.010607-8.1667088-1.640073-11.1133434-4.586708-2.9466346-2.946634-4.5973143-6.946186-4.5867079-11.113343v-1.2c-.0106064-4.167157 1.6400733-8.1667088 4.5867079-11.1133434s6.9461864-4.5973143 11.1133434-4.5867079h1.2c4.167157-.0106064 8.1667088 1.6400733 11.1133434 4.5867079s4.5973146 6.9461864 4.5867076 11.1133434v1.2c.010607 4.167157-1.640073 8.166709-4.5867076 11.113343-2.9466346 2.946635-6.9461864 4.597315-11.1133434 4.586708zm0 64.499878h-1.2c-5.6800683-.017032-10.9234942 3.044823-13.7 8.000071l14.3 8.2 14.3-8.2c-2.7765058-4.955248-8.0199317-8.017103-13.7-8.000071zm83.5-48.49998h-.6c-4.167157-.010607-8.166709 1.640073-11.113343 4.586708-2.946635 2.946634-4.597315 6.946186-4.586657 11.113343v1.2c-.014381 2.665273.67556 5.287049 2 7.6l14.3-8.3zm-14.3-88.999949c-1.312716 2.3177361-2.001821 4.936333-2.000051 7.6v1.2c-.010607 4.167157 1.640073 8.1667088 4.586708 11.1133434 2.946634 2.9466346 6.946186 4.5973143 11.113343 4.5867079h.6v-16.3000513zm-69.8-40.3-14.3 8.2c2.763108 4.9814936 8.0035416 8.0798521 13.7 8.1000713h1.2c5.6800683.0170313 10.9234942-3.0448232 13.7-8.0000713zm-69.7 40.2-14.3 8.3v16.3000513h.6c4.16715701.0106064 8.16670879-1.6400733 11.1133434-4.5867079 2.9466346-2.9466346 4.5973143-6.9461864 4.5867079-11.1133434v-1.2c-.0339338-2.6906753-.7202372-5.3329433-2.0000513-7.7zm-13.7 89.099949h-.6v16.200051l14.3 8.3c1.3127164-2.317736 2.0018209-4.936333 2.0000513-7.6v-1.2c.0106064-4.167157-1.6400733-8.166709-4.5867079-11.113343-2.94663461-2.946635-6.94618639-4.597315-11.1133434-4.586708z"
                  fill="#469ea2"
                />
                <g fill="#083b54">
                  <path
                    d="m84.3 195.2v-97.1l-84-48.5v97.1z"
                    fillOpacity=".15"
                  />
                  <path d="m168.4 145.8v-97l-84 48.5v97.1z" fillOpacity=".05" />
                </g>
              </g>
            </svg>
          </button>
        </div>
        <div className="flex justify-end col-span-1 gap-x-1 w-full">
          <button
            className="rounded-lg p-2 bg-opacity-30 hover:bg-opacity-50 mr-0"
            // TODO: add confirmation modal.
            onClick={() => {
              setOpenConfirm(true)
            }}
            title="Delete this Contact"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 stroke-pink-900 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              {/* <path strokeLinecap="round" strokeinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /> */}
              {/* <path fillRule="evenodd" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" /> */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
