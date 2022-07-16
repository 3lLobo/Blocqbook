import { useEffect, useState } from 'react'
import { Web3Storage } from 'web3.storage'
import { Client } from '@xmtp/xmtp-js'
import { ethers, Wallet } from 'ethers'
import { BezierSpinner } from '../Spinner/BezierSpinner'

const FileTransfer = () => {
  const token = process.env.NEXT_PUBLIC_WEB3STORAGE

  const [files, setFiles] = useState([])
  const [filesCID, setFilesCID] = useState([])
  const [address, setAddress] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [receivedMedia, setReceivedMedia] = useState([])
  const contactBook = [
    '0x31ca5fF81B577216e038412DD879b998ae7b71Db',
    '0x5BCA9820F9e70B211055F96aB88e7103D5C304D2',
  ]

  async function handleUpload(event) {
    event.preventDefault()
    setIsUploading(true)
    console.log('files:', files)

    console.log('> 📦 creating web3.storage client')
    const client = await new Web3Storage({ token })

    console.log(
      '> 🤖 chunking and hashing the files to calculate the Content ID'
    )
    const cid = await client.put(files, {
      onRootCidReady: (localCid) => {
        console.log(`> 🔑 locally calculated Content ID: ${localCid} `)
        console.log('> 📡 sending files to web3.storage ')
      },
      onStoredChunk: (bytes) =>
        console.log(`> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`),
    })
    console.log(`> ✅ web3.storage now hosting ${cid}`)
    console.log(`https://dweb.link/ipfs/${cid}`)
    setFilesCID(cid)

    console.log('> 📡 fetching the list of all unique uploads on this account')
    let totalBytes = 0
    for await (const upload of client.list()) {
      console.log(`> 📄 ${upload.cid}  ${upload.name}`)
      totalBytes += upload.dagSize || 0
    }
    console.log(`> ⁂ ${totalBytes.toLocaleString()} bytes stored!`)
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
    await conversation.send('/mediafile/' + filesCID)
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
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const wallet = provider.getSigner()
    const xmtp = await Client.create(wallet)
    for await (const contact of contactBook) {
      const conversation = await xmtp.conversations.newConversation(contact)
      console.log(`Loading messages from ${contact}...`)
      const messages = await conversation.messages()
      for await (const message of messages) {
        const sliced = message.content.slice(0, 11)
        if (
          (sliced === '/mediafile/') &
          (message.senderAddress !== wallet.getAddress())
        ) {
          const cid = message.content.slice(-59)
          const sender = message.senderAddress
          setReceivedMedia(prevState => [...prevState, {sender, cid}])
        }
      }
    }
    console.log('receivedMedia FINAL:', receivedMedia)
    console.log('receivedMedia.length:', receivedMedia.length);
  }

  // useEffect(() => {
  //   getFiles()
  // }, [])
  

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center gap-8 mt-4">
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
          {files.length !== 0 && (
            <button onClick={handleUpload}>Upload icon</button>
          )}
        </div>
        <div className="">
          <label htmlFor="addressPicker">Pick your friend</label>
          <input
            type="text"
            name="addressPicker"
            placeholder="for now just paste but should be a selector"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div></div>
        <button
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
              <div>{m.cid}</div>
            </div>
          ))}
        <button onClick={getFiles}>get</button>
      </div>
    </div>
  )
}

export default FileTransfer
