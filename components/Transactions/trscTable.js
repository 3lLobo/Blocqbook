// Table to display transaction details
import TimeAgo from 'timeago-react'

export const TrscTable = ({ transactions, address }) => {
  console.log(
    '🚀 ~ file: trscTable.js ~ line 5 ~ TrscTable ~ transactions',
    transactions
  )

  if (transactions.length === 0) {
    return (
      <div className="mx-auto mt-11 text-center">
        <p>No transactions</p>
      </div>
    )
  }

  return (
    <table className=" dark:font-medium text-slate-900 dark:text-snow my-11 border-separate border-spacing-5 ">
      <thead className="dark:text-snow">
        <tr>
          <th>Timestamp</th>
          <th>☯️</th>
          <th>Chain</th>
          <th>Address</th>
          <th>Value</th>
          <th>Info</th>
        </tr>
      </thead>
      <tbody className="text-xs ">
        {transactions?.map((transaction) => {
          const incoming =
            transaction.from_address === address?.toLocaleLowerCase()
              ? false
              : true
          return (
              <tr
              className='text- even:text-indigo-400'
              key={transaction.hash}
              >
                <td>
                  <TimeAgo datetime={transaction.block_signed_at} />
                </td>
                <td>{incoming ? '⬅️' : '➡️'}</td>
                <td>{transaction.chain_id}</td>
                <td>
                  {incoming ? transaction.from_address : transaction.to_address}
                </td>
                <td>{transaction.value}</td>
                <td>{transaction.to_address_label || '🏴‍☠️'}</td>
              </tr>
          )
        })}
      </tbody>
    </table>
  )
}
