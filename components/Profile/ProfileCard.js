import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useState } from 'react'
import { useGetAllTokenBalancesQuery } from '../../app/covApi'
import { BezierSpinner } from '../Spinner/BezierSpinner'
import { Avatar } from './Avatar'
import Balances from './Balances'
import { PrivTags } from './PrivTags'
import { PubTags } from './PubTags'
import { useDispatch, useSelector } from 'react-redux'
import { updateContact } from '../../app/contactSlice'
import { useGetPoapsQuery } from '../../app/poapApi'
import { PoapAvatar } from '../Poap'
import Image from 'next/image'

export const dummyProfile = (name, address) => ({
  bio: {
    name: name || 'CryptoPanda',
    address: address || '0xd9a51042eBE9A428e362B36F12Bd332bB565deEa',
    avatar:
      'https://pbs.twimg.com/profile_images/12098984010/CryptoPanda_400x400.jpg',
    notes: 'My First Note!!!',
  },
  isSelf: false,
  isOneHop: true,
  tags: {
    privTags: [],
    pubTags: [],
  },
  poap: {
    hasCommonPoap: false,
    poaps: [],
  },
  xmltChat: {
    isChat: false,
    chatId: '',
    chatData: [],
  },
  fileTransfer: {
    isTransfer: false,
    transferData: [],
  },
})

const ProfileCard = ({ profile }) => {
  const store = useSelector((state) => state.contact)
  const dispatch = useDispatch()

  const { data, loading, error } = useGetAllTokenBalancesQuery(
    profile?.bio?.address
      ? {
          address: profile.bio.address,
        }
      : skipToken,
    {
      pollingInterval: 300_000, // 5 minutes is the covalent update time
    }
  )

  console.log('Tokenbalance: ', data)
  // fetch poaps
  const {
    data: poapData,
    loading: poapLoading,
    error: poapError,
  } = useGetPoapsQuery(
    profile?.bio?.address
      ? {
          address: profile.bio.address,
        }
      : skipToken,
    {
      pollingInterval: 300_000, // 5 minutes is the covalent update time
    }
  )

  console.log('POAP data', poapData)
  function handleChange(e) {
    e.preventDefault()
    switch (e.target.id) {
      case 'notes':
        dispatch(
          updateContact({
            field1: 'bio',
            field2: 'notes',
            value: e.target.value,
          })
        )
        break
      case 'name':
        dispatch(
          updateContact({
            field1: 'bio',
            field2: 'name',
            value: e.target.value,
          })
        )
    }
  }

  return (
    <div className="border-2 dark:border-zinc-800 self-center grid justify-items-center m-8 p-4 shadow-lg">
      {(poapLoading || poapData) && (
        <div className="fixed ml-32 justify-start items-center h-14 w-full mb-3 flex flex-row gap-x-1 ">
          <div className="relative h-full scale-300 aspect-1 mr-8 dark:hue-rotate-180 dark:invert">
            <Image
              className=""
              layout="fill"
              src="/poap-badge.png"
              alt="poapbadge"
            />
          </div>
          {!poapLoading ? (
            poapData?.map((poap) => {
              console.log('POAP: ', poap)
              return (
                <div className=" h-full  aspect-1" key={poap.address}>
                  <PoapAvatar poapData={poap} />
                </div>
              )
            })
          ) : (
            <BezierSpinner />
          )}
        </div>
      )}
      <div className="hover:scale-105 hover:cursor-pointer transition-all duration-300 transform-gpu w-20 sm:w-36 mb-3">
        <Avatar src={profile.bio.avatar} />
      </div>

      <textarea
        className=" text-center backdrop-blur-xl dark:backdrop-brightness-110 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 flex flex-grow w-fit  border-slate-300 rounded-xl bg-transparent border-0 form-textarea resize-none text-bold text-3xl dark:text-indigo-50 mb-4 mx-2"
        rows="1"
        name="name"
        id="name"
        value={profile.bio.name}
        placeholder="Add a name..."
        onChange={(e) => handleChange(e)}
      ></textarea>
      <div className="ml-3 px-2 py-1 bg-indigo-500 bg-opacity-80 rounded-tr-xl rounded-bl-xl text-snow text-xs hover:text-snow-muted hover:text-semibold  hover:bg-indigo-600 transition-colors duration-300 truncate">
        {profile.bio.address}
      </div>
      {/* <div className="text-slate-900 text-semibold text-xl dark:text-snow p-6">
      </div> */}
      <div
        // TODO: open a separate modal to choose the tags and confirm. display the tags here without choice to change
        className="mt-3"
      >
        <PrivTags />
        <PubTags />
      </div>
      <div className="mt-3 prose backdrop-blur-xl dark:backdrop-brightness-110 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 flex flex-grow w-full sm:text-sm border-slate-300 rounded-xl">
        <textarea
          className="dark:text-snow bg-transparent border-0 rounded-xl p-3 form-textarea flex flex-grow resize-none"
          rows="4"
          name="notes"
          id="notes"
          value={profile.bio.notes}
          placeholder="Notes ..."
          onChange={(e) => handleChange(e)}
        ></textarea>
      </div>
      <div className="flex justify-center items-center mt-4">
        {!data ? <BezierSpinner /> : <Balances balances={data} />}
      </div>
    </div>
  )
}

export default ProfileCard
