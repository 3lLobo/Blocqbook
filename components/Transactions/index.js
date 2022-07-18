import { useGetTransactionsQuery } from '../../app/covApi'
import { PrettyTable } from './trscTable'
import { useDispatch, useSelector } from 'react-redux'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useGetAllTransactionsQuery } from '../../app/covApi'
import { BezierSpinner } from '../Spinner/BezierSpinner'

export const Transactions = () => {
  const store = useSelector((state) => state.evm)
  const dispatch = useDispatch()

  const { data, loading, error } = useGetAllTransactionsQuery(
    store.connected
      ? {
          address: store.account,
        }
      : skipToken,
    {
      pollingInterval: 300_000, // 5 minutes is the covalent update time
    }
  )
  if (!data || loading)
    return (
      <div className="flex justify-center items-center my-11">
        <BezierSpinner />
      </div>
    )
  if (error) {
    console.log('🚀 ~ file: index.js ~ line 23 ~ Transactions ~ error', error)
    // TODO: throw toast with error
    return <p>Error: {error.message}</p>
  }

  const allItems = []
  data.forEach((chainData) => {
    const chain_id = chainData.chain_id
    if (chainData.items.length > 0) {
      chainData.items.forEach((item) => {
        const newItem = {
          ...item,
          chain_id,
        }
        allItems.push(newItem)
      })
    }
  })
  // Sort transactions by date ✅
  allItems.sort((a, b) => {
    return Date.parse(b.block_signed_at) - Date.parse(a.block_signed_at)
  })

  return (
    <div>
      <PrettyTable transactions={allItems} />
    </div>
  )
}
