import { Head } from '../components/Head'
import Image from 'next/image'
import Header from '../components/Header'
import Poap from '../components/Poap'

export default function Home() {
  return (
    <div className="bg-mybg-light dark:bg-mybg-dark min-h-screen flex flex-col ">
      <Head />
      <Header />

      <main className="z-10 mx-auto max-w-6xl scrollbar-hide my-11 flex-grow ">
        <Image
          height={311}
          width={311}
          src="/ethereum-eth-logo-animated.gif"
          alt="ETHgif"
        />
      </main>
      <Poap />

      <footer className="mt-auto mb-0"></footer>
    </div>
  )
}
