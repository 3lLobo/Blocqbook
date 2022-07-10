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
  return await authenticateWithEthereum(window.ethereum)
}

const initOrUpdateContacts = async (accounts) => {
  const ceramic = await tryAuthenticate()
  const controller = ceramic.did._id.toString()
  const existingDoc = await loadDocumentByController(controller, ceramic)

  if (existingDoc.content?.length > 0) {
    return await updateAccountsDocument(existingDoc, accounts)
  } else {
    return await createAccountsDocument(accounts)
  }
}

async function loadDocumentByController(controller, ceramic) {
  //this should be done with deterministic but it's not working
  const res = await fetch(`/api/ceramic/${controller}`)
  const streamId = await res.json()
  if (streamId) {
    return await TileDocument.load(ceramic, streamId)
  }
  return []

  // return await TileDocument.deterministic(ceramic, {
  //   // A single controller must be provided to reference a deterministic document
  //   controllers: [controller],
  //   // A family or tag must be provided in addition to the controller
  //   family: 'contacts',
  //   // tags: ['contacts']
  // })
}

const createAccountsDocument = async (accounts) => {
  //MAYBE THERE'S A MORE EFFICIENT WAY. NOT SURE
  //FOR NOW I THINK IT'S OK
  const ceramic = await tryAuthenticate()
  // const ceramic = new CeramicClient(API_URL)

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
  const doc = await TileDocument.create(ceramic, newAccounts, {
    family: 'contacts',
    // tags: ['contacts']
  })
  console.log(`Document created with streamId: ${doc.id.toString()}.`)

  //when working deterministic, this shouldn't be done
  await fetch(`/api/ceramic/${ceramic.did._id.toString()}`, {
    method: 'POST',
    body: doc.id.toString(),
  })

  return doc
}

const updateAccountsDocument = async (existingDoc, accounts) => {
  const docToSave = existingDoc.content

  //comparing new with saved addresses
  const newAddressess = compareArrays(docToSave, accounts)

  if (newAddressess.length > 0) {
    //Pushing our new addresses to the ones already saved
    newAddressess.map((newAddress) => {
      const { address, name, notes, tags } = newAddress
      docToSave.push({
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

const compareArrays = (arr1, arr2) => {
  // first needs to go the addresses already saved on the db
  // or the smallest array
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr2[j].address == arr1[i].address) {
        arr2.splice(j, 1)
      }
    }
  }
  return arr2
}

export {
  tryAuthenticate,
  createAccountsDocument,
  updateAccountsDocument,
  initOrUpdateContacts,
}
