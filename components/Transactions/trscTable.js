import TimeAgo from 'timeago-react'

export function TrscTable({ transactions, address }) {
  if (transactions.length === 0) {
        return (
          <div className="mx-auto mt-11 text-center">
            <p>No transactions</p>
          </div>
        )
      }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300 dark:divide-zinc-900">
                <thead className="bg-gray-50 dark:bg-zinc-800">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-zinc-100 sm:pl-6">
                      Timestamp
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-zinc-100">
                      
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-zinc-100">
                      Chain Id
                    </th>
                    <th scope="col" className="px-8 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-zinc-100">
                      Address
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-zinc-100">
                      Value
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-zinc-100">
                      Info
                    </th>
            
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-zinc-800">
                  {transactions?.map((transaction) => {
                    const incoming =
                      transaction.from_address === address?.toLocaleLowerCase()
                        ? false
                        : true
                    return (
                      <tr key={transaction.hash}>
                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-zinc-900 dark:text-zinc-400 sm:pl-6'>
                          <TimeAgo datetime={transaction.block_signed_at} />
                        </td>
                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-zinc-900 dark:text-zinc-400 sm:pl-6'>{incoming ? '←' : '→'}</td>
                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-zinc-900 dark:text-zinc-400 sm:pl-6'>{transaction.chain_id}</td>
                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-zinc-900 dark:text-zinc-400 sm:pl-6'>
                          {incoming ? transaction.from_address : transaction.to_address}
                        </td>
                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-zinc-900 dark:text-zinc-400 sm:pl-6'>{transaction.value}</td>
                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-zinc-900 dark:text-zinc-400 sm:pl-6'>{transaction.to_address_label || '🏴‍☠️'}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
