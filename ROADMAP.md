# Roadmap for blockchain☎️contacts

🥁

A w3bapp for your blockchain contacts.
The base-func:
You auth with your wallet, we fetch all the wallets you ever had interaction with (on EVM chains) and you can save them with names, notes and tags, basically like the contacts on your phone.
That's an easy to implement base and offers a lot of room for creative expansion (sponsor challenges):

- DB structure - use Ceramic
- Encrypt private DB - use [Lit](https://developer.litprotocol.com/)
- Fetch multi-blockchain data - use of Covalent api -might not even be necessary if we use Moralis
- Browse an address and show how many hops away it is (based on your contacts). - Implement TheGraph subgraph
- Show assets of a Wallet - use TheGraph
- Public tags (legit, fraud, weirdo, nft...) which you can add to an wallet you interacted with and can be retrieved by anyone. - use IPFS for db storage (DAGs?) - Ceramic? or [Moralis](https://moralis.io/) with option to pin your private data to IPFS?
- Moralis also for user [auth](https://docs.moralis.io/moralis-dapp/connect-the-sdk/connect-with-react)
- Send files to your contacts - use IPFS lib2p
- Plot your 'universe', close circle, income/outcome, target group if you have an app. - saw this in a SuperFluid demo
- ML algs, like link prediction. But that goes to far for 3 weeks.
- OnChain messenger - use XMTP
- POAP for appUsers and POAP for XMTP msg waiting
- TheGraph subgraph to query addresses aho use ourApp, public tags and addresses which have been tagged.

We could use Remix (https://remix.run/blog/remix-stacks) which has a nice template for auth and database or stick to NextJs and use Supabase (I like that one better, we can do GraphQL queries here).

Both hackathons are very vague about what they want, both have a 'social track'.
The social impact of this app would be to help w3b users to organize and interact-with their contracts, one step further it could expose fraud or match you with cool new addresses.

## TODOs

1. Get started:
   - find a template or make a new UI design.
   - Open questions ❔:
     - from where to fetch blockchain data (address interactions) - covalent ✅
     - which chains we want to support (Mumbai & Kovan/Rinkeby/Goerly?) - all covalent supported ✅
     - what sdk for wallet auth (web3Modal & ethers rather than web3js?) - ceramic ✅
2. UI:
   - mockup UI ✅
   - Wallet auth ✅
   - go live (netlify?) ✅
   - add icons to tabs
   - replace emojis with icons
   - cooler landing page
3. Transaction dashboard
   - Search: search transactions
   - Parse addresses to names (<You!>)
   - show transaction in addrss ➡️ addrss style
   - add additional data from transaction
   - highlight transaction row by 'high frequency' or 'high value'
4. Address card:
   - open on address click
   - show POAPs and balances
   - option to add to contacts
5. Contacts:
   - Search: searches the contacts
   - list of contacts
   <!-- - option to add new contact -->
   - option to edit contact - nickName, avatar, tags, notes
   - option to delete contact
   - option to remove tag from contact
   - option to add public tag to contact - only if there was a direct transaction
   - icon with link to messenger
   - icon with link to fileTransfer
   - plus button to add new contact without transaction
6. Explore:
   - For now, search etherscan for input
7. Messenger:
   - Search conversations
   - XMTP integration
   - whatsapp style chats with addresses
   - plus button to start new chat
8. FileTransfer:
   - Search sent files
   - IPFS lib2p integration
   - table with transactions
   - Plus button to init new file transfer

Bacqend:
- User db with:
   - own profile
   - contacts with all fields
   - messenger history
   - file transfer history
   - OPTION: if ceramic does not work we can use supabase
- Public db:
   - store tags & if address uses our app
   - Could be an IPFS DAG stored on Filecoin/worldcloud
   - Could have a smart contract which processes every entry and keeps track of the latest CID of our DAG.
- Messenger:
   - get started with XMTP
   - copy PAPA React with his whatsapp clone
- FileTransfer:
   - get started with IPFS lib2p
   - OPTION1: client side IPFS daemon in browser
   - OPTION2: server side IPFS daemon through NextJs API
- Search: 
   - find a nice search algorithm
   - search as you go?

Design:
- Create/steal cool logo
- make a slide deck presenting the app

Submission:
- Demo video - populate with data first
- Pretty README
- Submit on time!!!

## Resources

[Polygon-Fauna app](https://docs.polygon.technology/docs/develop/dapp-fauna-polygon-react/) decentralized DB with contract call on every DB entry. Not sure what we need to call the contract for.

[BuildIt wk#1](https://www.youtube.com/watch?v=S8hZ5rDV7kg)

[BuildIt wk#2](https://www.youtube.com/watch?v=2Bae-wfl0es)

[XMTP chat app](https://github.com/xmtp/example-chat-react_)
