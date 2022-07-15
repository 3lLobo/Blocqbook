import { useReducer, useState } from 'react'
import { Web3Storage } from 'web3.storage'

const FileTransfer = () => {
    
    const [messages, showMessage] = useReducer((msgs, m) => msgs.concat(m), [])
    const [files, setFiles] = useState([])
    
  
    async function handleSubmit (event) {
      event.preventDefault()
  
      showMessage('> 📦 creating web3.storage client')
      const client = new Web3Storage( process.env.NEXT_PUBLIC_WEB3STORAGE )
  
      showMessage('> 🤖 chunking and hashing the files (in your browser!) to calculate the Content ID')
      const cid = await client.put(files, {
        onRootCidReady: localCid => {
          showMessage(`> 🔑 locally calculated Content ID: ${localCid} `)
          showMessage('> 📡 sending files to web3.storage ')
        },
        onStoredChunk: bytes => showMessage(`> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`)
      })
      showMessage(`> ✅ web3.storage now hosting ${cid}`)
      showLink(`https://dweb.link/ipfs/${cid}`)
  
      showMessage('> 📡 fetching the list of all unique uploads on this account')
      let totalBytes = 0
      for await (const upload of client.list()) {
        showMessage(`> 📄 ${upload.cid}  ${upload.name}`)
        totalBytes += upload.dagSize || 0
      }
      showMessage(`> ⁂ ${totalBytes.toLocaleString()} bytes stored!`)
    }
  
    function showLink (url) {
      showMessage(<span>&gt; 🔗 <a href={url}>{url}</a></span>)
    }
  
    return (
      <>
        <header>
          <h1>⁂
            <span>web3.storage</span>
          </h1>
        </header>
        <form id='upload-form' onSubmit={handleSubmit}>
          <label htmlFor='filepicker'>Pick files to store</label>
          <input type='file' id='filepicker' name='fileList' onChange={e => setFiles(e.target.files)} multiple required />
          <input type='submit' value='Submit' id='submit' />
        </form>
        <div id='output'>
          &gt; ⁂ waiting for form submission...
          {messages.map((m, i) => <div key={m + i}>{m}</div>)}
        </div>
      </>
    )
}

export default FileTransfer
