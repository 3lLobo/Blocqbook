// Table to display transaction details
import TimeAgo from 'timeago-react';

export const TrscTable = ({ transactions, address }) => {
  console.log("🚀 ~ file: trscTable.js ~ line 5 ~ TrscTable ~ transactions", transactions)


  // TODO: Add date/ time-ago of transaction
  if (transactions.length === 0) {
    return (
      <div
        className="mx-auto mt-11 text-center"
      >
        <p>No transactions on this chain</p>
      </div>
    )
  }

  return (
    <div
      className="prose dark:font-medium dark:text-snow my-11"
    >
      <tr>
        <th>Timestamp</th>
        <th>☯️</th>
        <th>Chain</th>
        <th>Address</th>
        <th>Value</th>
        <th>Info</th>
      </tr>
      <tbody
      className='text-xs'
      >
        {transactions?.map(transaction => {
          // TODO: sort by date
          const incoming = transaction.from_address === address?.toLocaleLowerCase() ? false : true
          return (
            <tr key={transaction.hash}>
              <td>
                <TimeAgo
                datetime={transaction.block_signed_at}
                />
              </td>
              <td>{incoming ? '⬅️' : '➡️'}</td>
              <td>{transaction.chain_id}</td>
              <td>{incoming ? transaction.from_address : transaction.to_address}</td>
              <td>{transaction.value}</td>
              <td>{transaction.to_address_label || '🏴‍☠️'}</td>
            </tr>
          )
        })}
      </tbody>
    </div>
  )
}