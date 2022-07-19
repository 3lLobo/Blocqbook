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

  // const profile = store.contactInEdit

  // const [profile, setProfile] = useState(dummyProfile)
  const { data, loading, error } = useGetAllTokenBalancesQuery(
    profile.bio.address ? {
      address: profile.bio.address,
    }
      : skipToken,
    {
      pollingInterval: 300_000, // 5 minutes is the covalent update time
    }
  )

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
    <div
      borderRadius="md"
      className="border-2 self-center grid justify-items-center m-8 p-4 shadow-lg"
    >
      <div
        // TODO: onClick open a modal where the user can input a new image URL, which gets previews and upon confirmation, saved to the profile
        className="w-40 pb-4"
      >
        <Avatar
          // TODO: make this clickable to enter a new image URL
          w="60"
          scale={110}
        />
      </div>

      <textarea
        className=" text-center backdrop-blur-xl dark:backdrop-brightness-110 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 flex flex-grow w-fit  border-slate-300 rounded-xl bg-transparent border-0 form-textarea resize-none text-bold text-3xl dark:text-indigo-50 mb-4"
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
        <PrivTags profile={profile} />
        <PubTags profile={profile} />
      </div>
      <div className="mt-3 prose backdrop-blur-xl dark:backdrop-brightness-110 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 flex flex-grow w-full sm:text-sm border-slate-300 rounded-xl">
        <textarea
          className="dark:text-snow bg-transparent border-0 rounded-xl p-3 form-textarea flex flex-grow resize-none"
          rows="4"
          name="notes"
          id="notes"
          value={profile.bio.notes}
          placeholder="Add your comment ..."
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
