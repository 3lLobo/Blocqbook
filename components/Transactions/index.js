import { useGetTransactionsQuery } from "../../app/covApi"


export const Transactions = () => {
  const address = process.env.NEXT_PUBLIC_MYADDRESS
  const { data, loading, error } = useGetTransactionsQuery({
    address,
    chain_id: '1',
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  if (!data) return <p>No data</p>
  console.log("transactions", data)
  return (
    <div>
      <h1>Transactions</h1>
      <ul>
        {data?.items?.map((transaction) => (
          <li key={transaction.tx_hash}>
            <p>{transaction.from_address === address.toLocaleLowerCase() ? transaction.to_address : transaction.from_address }</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
