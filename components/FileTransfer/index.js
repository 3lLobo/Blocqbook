import { useEffect, useState } from 'react'
import { Web3Storage } from 'web3.storage'
import { Client, CompositeCodec } from '@xmtp/xmtp-js'
import { ethers } from 'ethers'
import { BezierSpinner } from '../Spinner/BezierSpinner'
import Link from 'next/link'
import { Avatar } from '../Profile/Avatar'
import { Tag } from '../Profile/tag'

const FileTransfer = () => {
  const token = process.env.NEXT_PUBLIC_WEB3STORAGE
  const [files, setFiles] = useState([])
  const [filesCID, setFilesCID] = useState([])
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [receivedMedia, setReceivedMedia] = useState([])
  const contactBook = [
    '0x31ca5fF81B577216e038412DD879b998ae7b71Db',
    '0x5BCA9820F9e70B211055F96aB88e7103D5C304D2',
    '0x7495F698C121569b6e1915d884e550B25Fa08615',
  ]

  async function handleUpload() {
    setIsUploading(true)
    try {
      console.log('> 📦 creating web3.storage client')
      const client = new Web3Storage({ token })

      console.log(
        '> 🤖 chunking and hashing the files to calculate the Content ID'
      )
      const cid = await client.put(files, {
        onRootCidReady: (localCid) => {
          console.log(`> 🔑 locally calculated Content ID: ${localCid} `)
          console.log('> 📡 sending files to web3.storage ')
        },
        onStoredChunk: (bytes) =>
          console.log(
            `> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`
          ),
      })
      console.log(`> ✅ web3.storage now hosting ${cid}`)
      // console.log(`https://dweb.link/ipfs/${cid}`)
      setFilesCID(cid)

      // console.log(
      //   '> 📡 fetching the list of all unique uploads on this account'
      // )
      // let totalBytes = 0
      // for await (const upload of client.list()) {
      //   console.log(`> 📄 ${upload.cid}  ${upload.name}`)
      //   totalBytes += upload.dagSize || 0
      // }
      // console.log(`> ⁂ ${totalBytes.toLocaleString()} bytes stored!`)
    } catch (error) {
      console.log(error)
    }
    setIsUploading(false)
  }

  const sendFile = async () => {
    setIsUploading(true)
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts', [])
      const wallet = provider.getSigner()
      const xmtp = await Client.create(wallet)
      const conversation = await xmtp.conversations.newConversation(address)

      // console.log('Loading messages...')
      // const messages = await conversation.messages()
      // for await (const message of messages) {
      //   console.log(`[${message.senderAddress}]: ${message.content}`)
      // }

      // Send a message
      console.log('Sending file...')
      const messageToSend = JSON.stringify({
        message: 'THIS IS A FILE. CHECK IT ON FILETRANSFER TAB',
        cid: filesCID,
        description,
      })
      await conversation.send(messageToSend)
      setFiles([])
      setFilesCID([])
      setDescription('')
      setAddress('')
      console.log('Message sent.')
      // // Listen for new messages in the conversation
      // console.log('Loading conversations...')
      // const streamMessages = await conversation.streamMessages();
      // console.log('streamMessages:', streamMessages);
      // for await (const message of streamMessages) {
      //   console.log(`[${message.senderAddress}]: ${message.text}`)
      // }
      // console.log('Conversations loaded.')
    } catch (error) {
      console.log(error)
    }
    setIsUploading(false)
  }

  const getFiles = async () => {
    setReceivedMedia([])
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const wallet = provider.getSigner()
    const xmtp = await Client.create(wallet)
    for await (const contact of contactBook) {
      const conversation = await xmtp.conversations.newConversation(contact)
      console.log(`Loading messages from ${contact}...`)
      const messages = await conversation.messages()
      for await (const message of messages) {
        console.log('message:', message)
        const sliced = message.content?.slice(0, 64)
        if (
          (sliced ===
            '{"message":"THIS IS A FILE. CHECK IT ON FILETRANSFER TAB","cid":') &
          (message.senderAddress !== wallet.getAddress())
        ) {
          const newMedia = JSON.parse(message.content)
          newMedia['sender'] = message.senderAddress
          setReceivedMedia((prevState) => [...prevState, newMedia])
        }
      }
    }
  }

  useEffect(() => {
    if (files.length > 0) handleUpload()
  }, [files])

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center mt-4 w-11/12">
        <div className="text-2xl text-left w-full">
          Send files to your friends
        </div>
        <div className="bg-white dark:bg-slate-800 p-2 mx-6 my-2 w-full flex-row gap-3 rounded-xl grid grid-cols-16 grid-flow-col justify-start items-center text-slate-900  dark:text-snow relative">
          <label
            htmlFor="filePicker"
            className={`rounded-lg bg-slate-900 p-2  hover:bg-opacity-20 cursor-pointer ${
              files.length > 0 ? 'bg-opacity-20' : 'bg-opacity-10'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 stroke-indigo-600 dark:stroke-indigo-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <input
              type="file"
              id="filePicker"
              onChange={(e) => setFiles(e.target.files)}
              multiple
              required
              className="hidden w-full h-full"
            />
          </label>
          <input
            className="w-96 border-none active:border-blue-300 rounded-lg"
            type="text"
            value={address}
            placeholder="Search or paste your friend's address"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            className="w-full border-none active:border-blue-500 rounded-lg"
            type="text"
            placeholder="You can add a subject"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            disabled={isUploading || filesCID.length === 0}
            onClick={sendFile}
            className="bg-slate-900 text-slate-300 hover:bg-indigo-900 disabled:bg-gray-400 hover:text-snow group flex items-center px-2 py-2 text-sm font-medium rounded-md absolute right-2"
          >
            {isUploading ? (
              <BezierSpinner />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-white dark:stroke-indigo-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M17.218,2.268L2.477,8.388C2.13,8.535,2.164,9.05,2.542,9.134L9.33,10.67l1.535,6.787c0.083,0.377,0.602,0.415,0.745,0.065l6.123-14.74C17.866,2.46,17.539,2.134,17.218,2.268 M3.92,8.641l11.772-4.89L9.535,9.909L3.92,8.641z M11.358,16.078l-1.268-5.613l6.157-6.157L11.358,16.078z"></path>
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 mt-8 w-11/12">
        <div className="flex justify-between w-full">
          <div className="text-2xl">Files received</div>
          <button
            onClick={getFiles}
            className="bg-slate-900 text-slate-300 hover:bg-indigo-900 hover:text-snow group w-64 flex items-center justify-center px-2 py-2 text-sm font-medium rounded-md"
          >
            {receivedMedia.length === 0
              ? 'To check your inbox LogIn to XMTP'
              : 'Click here to refresh your inbox'}
          </button>
        </div>
        {receivedMedia.length > 0 &&
          receivedMedia.map((m, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 p-2 mx-6 w-full flex-row gap-3 rounded-xl grid grid-cols-16 grid-flow-col justify-start items-center text-slate-900  dark:text-snow relative"
            >
              <div className="w-10 ml-0 ">
                <Avatar scale={110} />
              </div>
              <div className="mr-11  col-span-2 div-black dark:div-indigo-50 self-center ">
                {' '}
                {m.sender}{' '}
              </div>
              <Link href={`https://ipfs.io/ipfs/${m.cid}`}>
                <a target="_blank">{m.description}</a>
              </Link>
              <div className="flex gap-4 absolute right-2">
                <div className="mr-11 space-x-1 col-span-2 flex flex-row">
                  <Tag tagText="dude.eth" color="indigo-300" />
                  <Tag tagText="dude.eth" />
                </div>
                <button className="rounded-lg bg-slate-900 p-2 bg-opacity-10 hover:bg-opacity-20">
                  {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 stroke-indigo-600 dark:stroke-indigo-300"
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
                  }
                </button>
                <button className="rounded-lg bg-slate-900 p-2 bg-opacity-10 hover:bg-opacity-20">
                  {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 stroke-indigo-600 dark:stroke-indigo-300"
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
                    </svg>
                  }
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default FileTransfer
