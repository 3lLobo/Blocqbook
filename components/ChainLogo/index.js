import Image from 'next/image'
import { CHAIN_INFO } from '../../constants/uniswap/chainInfo.ts'
import covalentChains from '../../constants/allCovalentChains.json'

export const ChainLogo = ({ chainId }) => {
  // const chain = CHAIN_INFO[chainId]?.label || chainId
  // const chainLogo = CHAIN_INFO[chainId]?.logoUrl || null

  const chain = covalentChains.items.find((chain) => {
    return parseInt(chain.chain_id) === chainId
  })
  if (!chain) {
    return
  }
  const { name, label, logo_url } = chain

  return (
    <div className="flex w-fit place-items-center">
      <div className="relative h-6 w-6 rounded-full ">
        {logo_url && (
          <Image layout="fill" src={logo_url} alt={name} title={name} />
        )}
      </div>
      <div className="text-xs text-indigo-900 dark:text-slate-400 text-left mx-1 truncate">
        {label}
      </div>
    </div>
  )
}
