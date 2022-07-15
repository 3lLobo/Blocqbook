import { CeramicClient } from '@ceramicnetwork/http-client'
import { DID } from 'dids'
import { getResolver as getKeyResolver } from 'key-did-resolver'
import { getResolver as get3IDResolver } from '@ceramicnetwork/3id-did-resolver'
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect'
import { TileDocument } from '@ceramicnetwork/stream-tile'

const API_URL = 'https://ceramic-clay.3boxlabs.com'

async function authenticateWithEthereum(ethereumProvider) {
  console.log('Authenticating for ceramic...')
  // Create a ThreeIdConnect connect instance as soon as possible in your app to start loading assets
  const threeID = new ThreeIdConnect()
  // Request accounts from the Ethereum provider
  const accounts = await ethereumProvider.request({
    method: 'eth_requestAccounts',
  })
  // Create an EthereumAuthProvider using the Ethereum provider and requested account
  const authProvider = new EthereumAuthProvider(ethereumProvider, accounts[0])
  // Connect the created EthereumAuthProvider to the 3ID Connect instance so it can be used to
  // generate the authentication secret
  await threeID.connect(authProvider)
  const ceramic = new CeramicClient(API_URL)
  const did = new DID({
    // Get the DID provider from the 3ID Connect instance
    provider: threeID.getDidProvider(),
    resolver: {
      ...get3IDResolver(ceramic),
      ...getKeyResolver(),
    },
  })
  // Authenticate the DID using the 3ID provider from 3ID Connect, this will trigger the
  // authentication flow using 3ID Connect and the Ethereum provider
  await did.authenticate()
  // The Ceramic client can create and update streams using the authenticated DID
  ceramic.did = did
  return ceramic
}
// When using extensions such as MetaMask, an Ethereum provider may be injected as `window.ethereum`
async function tryAuthenticate() {
  if (window.ethereum == null) {
    throw new Error('No injected Ethereum provider')
  }
  return (await authenticateWithEthereum(window.ethereum))
}

/**
 * Function that initialize or update contacts saved to ceramic DB.
 * @param {Array} accounts Accounts to save to ceramic for this user.
 * @returns {Object} Accounts saved to ceramic for this user.
 */
const initOrUpdateContacts = async (accounts) => {
  const ceramic = await tryAuthenticate()
  const controllers = [ceramic.did._id.toString()]
  const existingDoc = await loadDocumentByController(controllers, ceramic)

  console.log('Checking if user already has a DB in ceramic...')
  if (existingDoc.content[0]?.length > 0) {
    return await updateAccountsDocument(existingDoc, accounts)
  } else {
    return await createAccountsDocument(accounts)
  }
}

/**
 * Function that returns an object with the contacts saved for controller.
 * @param {Array} controllers User that own the document we're retrieving.
 * @param {CeramicClient} ceramic Ceramic client already signed.
 * @returns {Object} Document with contacts already stored in ceramic.
 */
async function loadDocumentByController(controllers, ceramic) {
  const family = 'contacts'
  return await TileDocument.deterministic(ceramic, {
    controllers,
    family,
    //schema: TDB
  })
}

/**
 * Function to initialize ceramic
 * @param {Array} accounts Data to initialize DB in ceramic.
 * @returns {Object} Document with data stored in ceramic.
 */
const createAccountsDocument = async (accounts) => {
  //MAYBE THERE'S A MORE EFFICIENT WAY. NOT SURE
  //FOR NOW I THINK IT'S OK
  const ceramic = await tryAuthenticate()
  //Create an empty array for our accounts with our schema
  const newAccounts = accounts.map((account) => {
    const { name, address, notes, tags } = account
    return {
      address,
      name,
      notes,
      tags,
    }
  })

  //Creates a document with our array
  console.log('Creating document in Ceramic...')
  const controllers = [ceramic.did._id.toString()]
  const family = 'contacts'
  const doc = await TileDocument.deterministic(ceramic, {
    controllers,
    family,
    //schema: TDB
  })
  await doc.update([newAccounts])

  console.log('Document created.')
  return doc
}

/**
 * Function to update an already saved document in ceramic.
 * @param {Object} existingDoc Document already saved to ceramic.
 * @param {Array} accounts New accounts to save.
 * @returns Document already updated to ceramic.
 */
const updateAccountsDocument = async (existingDoc, accounts) => {
  const docToSave = existingDoc.content
  //comparing new with saved addresses
  const newAddressess = compareArrays(docToSave[0], accounts)
  if (newAddressess.length > 0) {
    //Pushing our new addresses to the ones already saved
    newAddressess.map((newAddress) => {
      const { address, name, notes, tags } = newAddress
      docToSave[0].push({
        address,
        name,
        notes,
        tags,
      })
    })

    console.log('Updating document in Ceramic...')
    await existingDoc.update(docToSave)

    console.log('Document updated.')
  } else {
    console.log('Our DB is up to date. Nothing created or updated in Ceramic.')
  }
  return existingDoc
}

/**
 * Function that compares two arrays of addresses
 * @param {Array} arr1 Addresses saved on ceramic.
 * @param {Array} arr2 Addresses to save.
 * @returns {Array} New addresses that are not on the DB.
 */
const compareArrays = (arr1, arr2) => {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr2[j].address == arr1[i].address) {
        arr2.splice(j, 1)
      }
    }
  }
  return arr2
}

export { initOrUpdateContacts }
