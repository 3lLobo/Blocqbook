# Blocqbook
<!-- ![blocqbookTextSolidBanner](https://user-images.githubusercontent.com/70228821/180654821-224ca13c-9dcc-44de-9f44-16d565c0109b.png) -->
![blocqbookTextTransparentBannerLight](https://user-images.githubusercontent.com/70228821/180654920-7a1d72bc-da2a-410b-9130-33e764f89c3c.png)
An awesome web-3 app which allows you to retrive your transactions, add contacts, send text messages to peers & transfer files as well. Built by a team of three developers - [Florian Wolf](https://github.com/3lLobo) , [Julian Perassi](https://github.com/perassijulian) & [Reshma Shaik](https://github.com/TheReshma), this project lives up to the promise of decentralized WEB3. Just connect your [Metamask](https://metamask.io/) wallet, and voila! All your transactions have been fetched and you are now ready to chit chat with your peers the decentralized way !

## Live Site

Try out our app here : [Blocqbook](https://blocqbook.netlify.app/)

## Covalent

We've used the [Covalent](https://www.covalenthq.com/) API to fetch transactions from the blockchain. All transactions are displayed in the transactions tab of the app. We display the token balances of around 13 chains in the profile section, namely -

```
Ethereum Mainnet 
Kovan
Polygon
Polygon Mumbai
Binance Smart chain
Fantom
Fantom testnet
Arbitrium
Arbitrium Rinkeby
Avalanche
Avalanche Fuji
Harmony
Aurora 
```

## Ceramic 

Ceramic was our go to option for database as we wanted the app to be Web 3.0 and not Web 2.5 . We used [Ceramic](https://ceramic.network/) to initialize a database for every wallet registered. Users can connect their wallet and choose to link their pre-existing DID or get a new one. This way, all user data is stored in the blockchain and not in any centralized server. Checkout the [Ceramic Cook-Book](./ceramic/ceramicCookBook.md).

## XMTP 

We've used [XMTP](https://xmtp.com/) to enable decentralized messaging across wallets. To chat with an address, navigate to the 'Messenger' tab on the sidebar and Initiate a conversation by pasting your peer's address in the input area & hit the arrow button. Another way to initiate a conversation is to save a contact & then click on the chat icon in the contact card.

## IPFS 

We've used [IPFS](https://ipfs.io/) to allow decentralized file sharing without the hassle of juggling with the CIDs. Navigate to the File Transfer tab & drop your files with the receiver's address or you can click on the IPFS icon on the receiver's contact card. The file is uploaded to IPFS and the CID is sent to the receiver via messenger powered by XMTP. 

## Polygon & The Graph

We've used deployed a smart contract on [Polygon Mumbai](https://mumbai.polygonscan.com/) which emits an event when an address is tagged a public tag ( such as - ``scam`` or ``airdrop`` ). We deployed a subgraph using [The Graph](https://thegraph.com/hosted-service) to index the events. All the addresses that have been given a public tag are now on the blockchain and can be retrieved by querying the subgraph. This helps in fraud detection & address identification.

Contract Address : [0xde4d7f0a42aa7df311b3cc18ef5231f501168695](https://mumbai.polygonscan.com/address/0xde4d7f0a42aa7df311b3cc18ef5231f501168695#events)

Subgraph : [Polygon](https://thegraph.com/hosted-service/subgraph/notthatdumb/contract-polygon)

## Poaps

Did we say [POAPS](https://poap.xyz/)?  Hell Yeah, we did. We are giving out POAPs to the early users of Blocqbook. Do grab one & mint them for free in the Gnosis chain.

## Tech Stack 

```
Next.js
React.js
Redux Tookit
Tailwind CSS
Ethers.js
```

![HFs](./public/hacqFSbanner.png)
