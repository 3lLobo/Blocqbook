import {ethers} from 'ethers'

const provider = new ethers.providers.JsonRpcProvider(
  `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_ALCHEMY_PRIVATE_KEY}`
  )
const privateKey1 = '0x'

const address = '0xDe4d7F0A42aa7DF311b3cC18eF5231f501168695'
const abi = [
  "function addTag(address _person, string memory _tag) public onlyOwner",
  "function deleteTag(address _person, string memory _tag) public onlyOwner",
];

const contract = new ethers.Contract(address, abi, provider)
const wallet = new ethers.Wallet(privateKey1, provider)

async function addTag(tag_address, tag){

  console.log(`\n ${tag_address} has been given the tag - ${tag}\n`)

  const contractWithWallet = contract.connect(wallet)
  console.log("wallet connection done");

  const tx = await contractWithWallet.addTag(tag_address, tag)
  console.log(tx)
  await tx.wait(1) 
  console.log(tx)

  return true;
}

export default addTag;