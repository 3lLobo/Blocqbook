import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useEffect, useRef, useState } from 'react'
import { useGetAllTokenBalancesQuery } from '../../app/covApi'
import { BezierSpinner } from '../Spinner/BezierSpinner'
import { Avatar } from './Avatar'
import Balances from './Balances'
import { PrivTags } from './PrivTags'
import { PubTags } from './PubTags'
import { useDispatch, useSelector } from 'react-redux'
import { updateContact } from '../../app/contactSlice'
import { PoapAvatar } from '../Poap'
// import Image from 'next/image'
import { useCommonPoap } from '../../hooks/useCommonPoap'
import { uploadImage } from '../../lib/uploadToWeb3Storage'

const ProfileCard = ({ profile }) => {
  const [files, setFiles] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const extension = useRef('')
  const store = useSelector((state) => state.contact)
  const dispatch = useDispatch()

  const { data, loading, error } = useGetAllTokenBalancesQuery(
    profile.bio.address
      ? {
          address: profile.bio.address,
        }
      : skipToken,
    {
      pollingInterval: 300_000, // 5 minutes is the covalent update time
    }
  )

  // console.log('Tokenbalance: ', data)
  // fetch poaps
  const { commonPoaps, poapData, poapLoading, poapError } = useCommonPoap({
    address: profile.bio.address,
    doUpdate: true,
  })

  async function handleUpload(filesToUpload) {
    setIsUploading(true)
    const cid = await uploadImage(filesToUpload)
    dispatch(
      updateContact({
        field1: 'bio',
        field2: 'avatar',
        value: `http://ipfs.io/ipfs/${cid}/media.${extension}`,
      })
    )
    setIsUploading(false)
  }

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

  useEffect(() => {
    const upload = async (file) => {
      await handleUpload(file)
    }
    if (files?.length > 0) {
      const file = files[0]
      const type = file.type
      extension.current = type.split('/')[1]
      const blob = file.slice(0, file.size, type)
      const newFile = [new File([blob], `media.${extension}`, { type })]
      upload(newFile)
    }
  }, [files])

  return (
    <div className="border-2 dark:border-zinc-800 self-center grid justify-items-center m-8 p-4 shadow-lg">
      {(poapLoading || poapData?.length > 0) && (
        <div
          // TODO: align down
          className="fixed ml-32 justify-start items-start h-fit z-0 w-full mb-3 gap-y-3 flex flex-col "
        >
          <div className="relative ml-2 h-16 scale-300 mb-11 aspect-1 dark:hue-rotate-180 dark:invert ">
            <img
              className=""
              layout="fill"
              src="/poap-badge.png"
              alt="poapbadge"
            />
          </div>
          {!poapLoading ? (
            poapData.map((poap) => {
              const isCommon = commonPoaps.includes(poap.event.id)
              return (
                <div className=" h-20 aspect-1" key={poap.address}>
                  <PoapAvatar poapData={poap} isCommon={isCommon} />
                </div>
              )
            })
          ) : (
            <BezierSpinner />
          )}
        </div>
      )}
      <div className="hover:scale-105 transition-all duration-300 transform-gpu w-20 sm:w-36 mb-3 relative">
        <label htmlFor="filePicker" className="cursor-pointer">
          <Avatar src={profile.bio.avatar} />
          <input
            type="file"
            id="filePicker"
            onChange={(e) => setFiles(e.target.files)}
            className="hidden w-full h-full"
          />
        </label>
        {isUploading && (
          <div className="absolute right-0 top-0">
            <BezierSpinner />
          </div>
        )}
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
