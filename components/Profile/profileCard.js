import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useState } from 'react'
import { useGetAllTokenBalancesQuery } from '../../app/covApi'
import { BezierSpinner } from '../Spinner/BezierSpinner'
import { Avatar } from './Avatar'
import { PrivTags } from './privTags'
import { PubTags } from './pubTags'

export const dummyProfile = {
  bio: {
    name: 'CryptoPanda',
    address: '0xd9a51042eBE9A428e362B36F12Bd332bB565deEa',
    avatar:
      'https://pbs.twimg.com/profile_images/12098984010/CryptoPanda_400x400.jpg',
    notes: 'My First Note!!!',
    isSelf: false,
    isOneHop: true,
  },
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
}
// TODO: make this a modal which pops up when you click on an address
//  https://headlessui.com/react/dialog

// TODO: get the address as props
const ProfileCard = () => {
  // TODO: store the profile to the DB
  const [profile, setProfile] = useState(dummyProfile)
  const { data, loading, error } = useGetAllTokenBalancesQuery(
    {
      address: profile.bio.address,
    } || skipToken,
    {
      pollingInterval: 300_000, // 5 minutes is the covalent update time
    }
  )

  function handleChange(e) {
    e.preventDefault()
    switch (e.target.id) {
      case 'notes':
        setProfile((prevState) => ({
          ...prevState,
          bio: { ...prevState.bio, notes: e.target.value },
        }))
        break
      case 'name':
        setProfile((prevState) => ({
          ...prevState,
          bio: { ...prevState.bio, name: e.target.value },
        }))
    }
  }
  console.log(data)

  return (
    <div
      borderRadius="md"
      className="border-2 self-center grid justify-items-center m-8 p-4 shadow-lg"
    >
      <div
        // TODO: onClick open a modal where the user can input a new image URL, which gets previews and upon confirmation, saved to the profile
        className="w-40 pb-4"
      >
        <Avatar w="60" scale={110} />
      </div>

      <textarea
        className=" text-center backdrop-blur-xl dark:backdrop-brightness-110 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 flex flex-grow w-fit  border-slate-300 rounded-xl bg-transparent border-0 form-textarea resize-none text-bold text-3xl dark:text-indigo-50 mb-4"
        rows="1"
        name="name"
        id="name"
        value={profile.bio.name}
        placeholder="Add a nick-name..."
        onChange={(e) => handleChange(e)}
      ></textarea>
      <div className="ml-3 px-2 py-1 bg-indigo-500 bg-opacity-80 rounded-tr-xl rounded-bl-xl text-snow text-xs hover:text-snow-muted hover:text-semibold  hover:bg-indigo-600 transition-colors duration-300 truncate">
        {profile.bio.address}
      </div>
      {/* <div className="text-slate-900 text-semibold text-xl dark:text-snow p-6">
      </div> */}
      <div className="mt-3">
        <PrivTags />
        <PubTags />
      </div>
      <div
        // className="mt-1"
        className="mt-3 prose backdrop-blur-xl dark:backdrop-brightness-110 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 flex flex-grow w-full sm:text-sm border-slate-300 rounded-xl"
      >
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
      <div className="mt-11">
        {loading ? (
          <BezierSpinner radius={10} />
        ) : (
          data && (
            <div
              // TODO: for each chain a dropdown with a list of tokens with non-zero balance
              // https://tailwindui.com/components/application-ui/lists/stacked-lists
              className="dark:text-indigo-200 w-40 truncate"
            >
              {JSON.stringify(data)}
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default ProfileCard
