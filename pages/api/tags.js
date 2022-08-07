import { ethers } from 'ethers'

// The api
export default async function handler(req, res) {
  const { targetAddress, tag, mode } = req.body
  console.log(`\n ${targetAddress} has been given the tag - ${tag}\n`)

  try {
    var tx
    switch (mode) {
      case 'add':
        tx = await addTag(targetAddress, tag)
        break
      case 'delete':
        tx = await delTag(targetAddress, tag)
        breal
      default:
        res.status(400).json({ error: 'Invalid mode' })
        break
    }
    res.status(200).json({ tx: tx })
    console.log(tx)
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

// The logic
const provider = new ethers.providers.JsonRpcProvider(
  `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_ALCHEMY_PRIVATE_KEY}`
)

// Contract stuff
const privateKey1 = process.env.NEXT_TAG_CONTRACT_KEY
const address = '0xDe4d7F0A42aa7DF311b3cC18eF5231f501168695'
const abi = [
  'function addTag(address _person, string memory _tag) public onlyOwner',
  'function deleteTag(address _person, string memory _tag) public onlyOwner',
]
const contract = new ethers.Contract(address, abi, provider)
const wallet = new ethers.Wallet(privateKey1, provider)

function connectWallet() {
  const contractWithWallet = contract.connect(wallet)
  console.log('wallet connection done')
  return contractWithWallet
}

async function addTag(tag_address, tag) {
  const contractWithWallet = connectWallet()
  const tx = await contractWithWallet.addTag(tag_address, tag)
  return tx
}

async function delTag(tag_address, tag) {
  const contractWithWallet = connectWallet()
  const tx = await contractWithWallet.deleteTag(tag_address, tag)
  return tx
}
