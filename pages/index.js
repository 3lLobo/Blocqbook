import { Head } from '../components/Head'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'

import GithubFooter from '../components/GithubFooter'
export default function Home() {
  const store = useSelector((state) => state.evm)

  return (
    <div className="bg-mybg-light dark:bg-mybg-dark">
      <div className=" bg-cover min-h-screen flex flex-col">
        <Head />
        <Header />

        <main className="relative mx-auto w-full max-w-2xl scrollbar-hide flex flex-col my-auto  ">
          <div className=" mx-auto w-full h-60 bg-logo-black dark:bg-logo-indigo bg-cover bg-center" />
          <div className="sm:mt-11 mx-auto w-1/2 h-32 bg-catch-phrase bg-cover bg-center" />
        </main>
        <footer className="mt-auto mb-0">
          <GithubFooter />
        </footer>
      </div>
    </div>
  )
}
