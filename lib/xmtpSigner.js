import { ethers } from 'ethers'

export function getWeb3Signer() {
  const ethProvider = new ethers.providers.Web3Provider(window.ethereum)
  return ethProvider.getSigner()
}
