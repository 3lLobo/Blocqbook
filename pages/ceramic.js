import Head from '../components/Head'
import Header from '../components/Header'
import {
  initOrUpdateContacts,
} from '../lib/ceramicFunctions'

const ceramic = () => {
  const create = async () => {
    const acc1 = {
      address: '0x234897',
      name: 'Annie',
      notes: 'Annie is the best',
      tags: ['nft', 'defi'],
    }
    const acc2 = {
      address: '0x123456',
      name: 'Bob',
      notes: 'Bob is the best',
      tags: ['nft'],
    }
    const acc3 = {
      address: '0x654321',
      name: 'Charlie',
      notes: 'Charlie is cool',
      tags: ['gamefy'],
    }
    const acc4 = {
      address: '0x987654',
      name: 'Daniel',
      notes: 'Daniel is nice',
      tags: ['bitcoin'],
    }
    const acc5 = {
      address: '0x456789',
      name: 'Esteban',
      notes: 'Esteban is nice',
      tags: ['bitcoin'],
    }
    const doc = await initOrUpdateContacts([])
    console.log('doc:', doc.content[0])
  }
  return (
    <div className="bg-mybg-light dark:bg-mybg-dark min-h-screen flex flex-col ">
      <Head />
      <Header />

      <main className="z-10 mx-auto max-w-6xl scrollbar-hide my-11 flex-grow ">
        <button onClick={() => create()}>check</button>
      </main>

      <footer className="mt-auto mb-0"></footer>
    </div>
  )
}

export default ceramic
