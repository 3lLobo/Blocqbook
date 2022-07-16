import { useEffect, useState } from 'react'
import { Web3Storage } from 'web3.storage'
import { Client } from '@xmtp/xmtp-js'
import { ethers, Wallet } from 'ethers'
import { BezierSpinner } from '../Spinner/BezierSpinner'
import Link from 'next/link'

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
      console.log(`https://dweb.link/ipfs/${cid}`)
      setFilesCID(cid)

      console.log(
        '> 📡 fetching the list of all unique uploads on this account'
      )
      let totalBytes = 0
      for await (const upload of client.list()) {
        console.log(`> 📄 ${upload.cid}  ${upload.name}`)
        totalBytes += upload.dagSize || 0
      }
      console.log(`> ⁂ ${totalBytes.toLocaleString()} bytes stored!`)
    } catch (error) {
      console.log(error)
    }
    setIsUploading(false)
  }

  const sendFile = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const wallet = provider.getSigner()
    const xmtp = await Client.create(wallet)
    const conversation = await xmtp.conversations.newConversation(address)

    console.log('Loading messages...')
    const messages = await conversation.messages()
    for await (const message of messages) {
      console.log(`[${message.senderAddress}]: ${message.content}`)
    }

    // Send a message
    console.log('Sending message...')
    const messageToSend = JSON.stringify({
      message: 'THIS IS A FILE. CHECK IT ON FILETRANSFER TAB',
      cid: filesCID,
      description,
    })
    await conversation.send(messageToSend)
    console.log('Message sent.')
    // // Listen for new messages in the conversation
    // console.log('Loading conversations...')
    // const streamMessages = await conversation.streamMessages();
    // console.log('streamMessages:', streamMessages);
    // for await (const message of streamMessages) {
    //   console.log(`[${message.senderAddress}]: ${message.text}`)
    // }
    // console.log('Conversations loaded.')
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
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center gap-8 mt-4 p-4 w-3/4 bg-red-500">
        <div className="text-2xl">Send files to your friends</div>
        <div className="">
          <label htmlFor="filePicker">Pick files to send</label>
          <input
            type="file"
            name="filePicker"
            onChange={(e) => setFiles(e.target.files)}
            multiple
            required
          />
        </div>
        <div className="">
          <label htmlFor="addressPicker">Pick your friend</label>
          <input
            className="w-96"
            type="text"
            name="addressPicker"
            placeholder="for now just paste but should be a selector"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="">
          <label htmlFor="descriptionPicker">You can add a subject</label>
          <input
            className="w-96"
            type="text"
            name="descriptionPicker"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          className='bg-slate-900 text-slate-300 hover:bg-indigo-900 hover:text-snow group flex items-center px-2 py-2 text-sm font-medium rounded-md'
          disabled={isUploading || filesCID.length === 0}
          onClick={sendFile}
        >
          {isUploading ? <BezierSpinner /> : 'SEND FILE'}
        </button>
      </div>
      <div className="flex flex-col items-center gap-8 mt-8">
        <div className="text-2xl">Files received</div>
        {receivedMedia.length > 0 &&
          receivedMedia.map((m, i) => (
            <div key={i} className="flex flex-col">
              <div>{m.sender}</div>
              <div>{m.description}</div>
              <Link href={`https://ipfs.io/ipfs/${m.cid}`}>
                <a target="_blank">Go to file</a>
              </Link>
            </div>
          ))}
        <button
          onClick={getFiles}
          className='bg-slate-900 text-slate-300 hover:bg-indigo-900 hover:text-snow group flex items-center px-2 py-2 text-sm font-medium rounded-md'
        >
          {receivedMedia.length === 0 ? "To check your inbox LogIn to XMTP" : "Click here to refresh your inbox"}
        </button>
      </div>
    </div>
  )
}

export default FileTransfer
