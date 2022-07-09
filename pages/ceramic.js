import Head from '../components/Head'
import Header from '../components/Header'
import {
  createAccountsDocument,
  updateAccountsDocument,
  initOrUpdateContacts,
} from '../lib/ceramicFunctions'

const Ceramic = () => {
  //THIS PAGE IS FOR TESTING PURPOSES. WHEN CERAMIC INTEGRATION IS WORKING
  //ITS GONNA BE DELETED. ALSO I'M USING IT FOR OTHER TESTINGS LIKE POAP

  const create = async () => {
    await initOrUpdateContacts(['acc1', 'acc2', 'acc3', 'acc4'])
  }

  const getPoapLink = async () => {
    const res = await fetch('/api/poap')
    const url = await res.json()
    console.log(url)
  }

  return (
    <div className="bg-mybg-light dark:bg-mybg-dark min-h-screen flex flex-col ">
      <Head />
      <Header />

      <main className="z-10 mx-auto max-w-6xl scrollbar-hide my-11 flex-grow ">
        <button onClick={() => create()}>check</button>
        <button onClick={() => getPoapLink()}>getPoapLink</button>
      </main>

      <footer className="mt-auto mb-0"></footer>
    </div>
  )
}

export default Ceramic
