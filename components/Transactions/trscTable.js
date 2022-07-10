// Table to display transaction details


export const TrscTable = ({ transactions, address }) => {
  console.log("🚀 ~ file: trscTable.js ~ line 5 ~ TrscTable ~ transactions", transactions)


  // TODO: Add date/ time-ago of transaction
  if (transactions.length === 0) {
    console.log("RETURNNN", transactions)
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
        <th>Direction</th>
        <th>Address</th>
        <th>Value</th>
        <th>Description</th>
      </tr>
      <tbody>
        {transactions?.map(transaction => {
          const incoming = transaction.from_address === address?.toLocaleLowerCase() ? false : true
          return (
            <tr key={transaction.hash}>
              <td>{incoming ? '⬅️' : '➡️'}</td>
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