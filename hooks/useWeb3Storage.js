import { useEffect } from "react"


export const useWeb3Storage = ({ files }) => {
  const token = process.env.NEXT_PUBLIC_WEB3STORAGE
  // const [files, setFiles] = useState([])
  const [web3storageCid, setWeb3storageCid] = useState([])
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (files) {
      setIsUploading(true)
      handleUpload()
    }
    async function handleUpload() {
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
        setWeb3storageCid(cid)
      } catch (error) {
        console.log(error)
      }
      setIsUploading(false)
    }
  }, [files])

  return { web3storageCid, isUploading }

}
