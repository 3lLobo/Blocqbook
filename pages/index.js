import { Head } from '../components/Head'
import Image from 'next/image'
import Header from '../components/Header'
import { Transactions } from '../components/Transactions'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setConnection } from '../app/evmSlice'
import { MyButton } from '../components/Buttons/MyButton'
import Link from 'next/link'
import { Layout } from '../components/Layout'


export default function Home() {
  const store = useSelector(state => state.evm)
  const dispatch = useDispatch()


  return (
    <Layout>
      <div
        className='mx-auto flex flex-col'
      >
        <Image
          height={311}
          width={311}
          src="/ethereum-eth-logo-animated.gif"
          alt="ETHgif"
        />
        {store.connected
          &&
          <div
            className='mx-auto mt-11 bg-navy-muted dark:bg-opacity-0 p-3 rounded-xl'
          >
            <Link
              href={`/book/${store.account}`}>
              <MyButton
                text="My ☎️ book"
              />
            </Link>

          </div>
        }
      </div>
    </Layout >
  )
}
