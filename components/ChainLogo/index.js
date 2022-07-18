import Image from 'next/image'
import { CHAIN_INFO } from '../../constants/uniswap/chainInfo.ts'

export const ChainLogo = ({ chainId }) => {
  const chain = CHAIN_INFO[chainId]?.label || chainId
  const chainLogo = CHAIN_INFO[chainId]?.logoUrl || null

  return (
    <div className="flex w-fit place-items-center">
      <div className="relative h-6 w-6 rounded-full ">
        {chainLogo && (
          <Image layout="fill" src={chainLogo} alt={chain} title={chain} />
        )}
      </div>
      <div className="text-xs text-indigo-900 dark:text-slate-400 text-left mx-1 truncate">
        {chain}
      </div>
    </div>
  )
}
