import { Web3Storage } from 'web3.storage'

export const uploadImage = async (filesToUpload) => {
  const token = process.env.NEXT_PUBLIC_WEB3STORAGE
  try {
    console.log('> 📦 creating web3.storage client')
    const client = new Web3Storage({ token })

    console.log(
      '> 🤖 chunking and hashing the files to calculate the Content ID'
    )
    const cid = await client.put(filesToUpload, {
      onRootCidReady: (localCid) => {
        console.log(`> 🔑 locally calculated Content ID: ${localCid} `)
        console.log('> 📡 sending files to web3.storage ')
      },
      onStoredChunk: (bytes) =>
        console.log(`> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`),
    })
    console.log(`> ✅ web3.storage now hosting ${cid}`)
    console.log('cid:', cid);

    return cid
  } catch (error) {
    console.log(error)
  }
}
