import { useState, useEffect } from 'react'
// import useWallet from './useWallet'

const useEns = (addressOrName: string | undefined) => {
  // const { resolveName, lookupAddress, getAvatarUrl } = useWallet()
  const [address, setAddress] = useState<string | undefined>(addressOrName)
  const [name, setName] = useState<string | undefined>(addressOrName)
  const [avatarUrl, setAvatarUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const probableAddress =
    addressOrName?.startsWith('0x') && addressOrName?.length === 42
      ? addressOrName
      : undefined

  return {
    address: probableAddress || (address as string | undefined),
    name: probableName || (name as string | undefined),
    avatarUrl: avatarUrl as string | undefined,
    loading,
  }
}

export default useEns
