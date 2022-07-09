import { CeramicClient } from '@ceramicnetwork/http-client'
import { DID } from 'dids'
import { getResolver as getKeyResolver } from 'key-did-resolver'
import { getResolver as get3IDResolver } from '@ceramicnetwork/3id-did-resolver'
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect'
import { TileDocument } from '@ceramicnetwork/stream-tile'

const API_URL = 'https://ceramic-clay.3boxlabs.com'

async function authenticateWithEthereum(ethereumProvider) {
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

  if (existingDoc.length > 0) {
    await updateAccountsDocument(existingDoc, accounts)
  } else {
    //trying to check what's wrong
    const streamId =
      'kjzl6cwe1jw145mi5gexc6bf4cm2d25a4u1eksx3mh94kwj5vf4pbradyjii4an'

    const controller = ceramic.did._id.toString()
    const loadedDoc = await loadDocumentByController(controller, ceramic)
    const loadingDocWithstreamId = await TileDocument.load(ceramic, streamId)

    console.log('loadingDocWithstreamId:', loadingDocWithstreamId.content)
    console.log('loadedDoc:', loadedDoc.content)

    console.log(
      'loadingDocWithstreamId.metadata.controllers[0]',
      loadingDocWithstreamId.metadata.controllers[0]
    )
    console.log(
      'loadingDocWithstreamId.metadata.family:',
      loadingDocWithstreamId.metadata.family
    )
    console.log('ceramic.did._id', ceramic.did._id)

    await createAccountsDocument(accounts)
  }
}

async function loadDocumentByController(controller, ceramic) {
  return await TileDocument.deterministic(ceramic, {
    // A single controller must be provided to reference a deterministic document
    controllers: [controller],
    // A family or tag must be provided in addition to the controller
    family: ['contacts'],
    // tags: ['contacts']
  })
}

const createAccountsDocument = async (accounts) => {
  //MAYBE THERE'S A MORE EFFICIENT WAY. NOT SURE
  //FOR NOW I THINK IT'S OK
  const ceramic = await tryAuthenticate()
  // const ceramic = new CeramicClient(API_URL)

  //Create an empty array for our accounts with our schema
  const accountsBlank = accounts.map((account) => ({
    address: account,
    name: 'names',
    notes: '',
    tags: [],
  }))

  //Creates a document with our array
  console.log('Creating blank document in Ceramic...')
  const doc = await TileDocument.create(ceramic, accountsBlank, {
    family: 'contacts',
    // tags: ['contacts']
  })
  console.log(`Document created with streamId: ${doc.id.toString()}`)
}

const updateAccountsDocument = async (existingDoc, accounts) => {
  //creating an array with addresses already saved
  const existingAddresses = existingDoc.content.map(
    (account) => account.address
  )

  //comparing new with saved addresses
  const newAddressess = compareArrays(existingAddresses, accounts)

  if (newAddressess.length > 0) {
    const docToSave = existingDoc.content

    //Pushing our new addresses to the ones already saved
    newAddressess.map((newAddress) =>
      docToSave.push({
        address: newAddress,
        name: '',
        notes: '',
        tags: [],
      })
    )

    console.log('Updating document with our new addresses in Ceramic')
    await existingDoc.update(docToSave)
    console.log('Document updated')
  }
}

const compareArrays = (arr1, arr2) => {
  // first needs to go the addresses already saved on the db
  // or the smallest array
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr2[j] == arr1[i]) {
        arr2.splice(j, 1)
      }
    }
  }
  return arr2
}

export { tryAuthenticate, createAccountsDocument, updateAccountsDocument, initOrUpdateContacts }
