![bbbanner](/public/logov2/booqName/blocqbookN.png)

# PolygonBUIDL

The blocq☎️book v3. We skip v2 cuz even numbers are boring!

This project addresses the need for a decentralized contact management system for EVM wallets and blockchain enthusiasts. We create and curate a decentralized, user-owned contact DB, upwards-compatible for integration with interaction-based EVM dApps.

TL;DR: The Blocq☎️book:
- Bacqend:
  - decentralized contact DB (IPFS) with customization inspired by Discord. `#Web3Tooling` 
  - tagging system with a dcntrlzd subgraph (theGraph) offering a public GQl endpoint. `#SocialGood` `#ComunityBuilding`
  - integration with the XMTP network.
- Frontend:
  - UI for contact management and tagging. `#W3btransition`
  - multi(13)-chain transaction and token-balance explorer
  - 3 decentralized Google-suite clones to demonstrate the integrability of our DB: 
    1. Instant messaging `#W3btransition`
    2. File storage and  `#W3btransition`
    3. transfer with 1TB soft limit 🧑🏾‍🚀 `#W3btransition`

IPFS/Spheron dcntrlzd app: https://polygonbuidl-y8q1s2.spheron.app/
Centralized (fallbacq): https://blocqbook.netlify.app/

## A booq, What is that even?

<!-- img grandpa avatar -->

Well kid, bacq in the days, we used to have a book with the names and numbers of everyone in town. It was called white-pages, or phonebook. Sounds crazy, right?

Then you won't believe what I came up with:

A phonebook for the blockchain! Fully decentralized and user owned.
With the help of IPFS and the Ceramic protocol, your contacts are stored on decentralized storage and can only be accessed by you!

Why does that matter? Because you shouldn't rely on anyone, not on me, not on Google, not on Facebook, especially not on Facebook, zero trust!

It's like learning to walk on your own, making your very first steps. But hey, it get's even better: Your database is fully upwards compatible. You can choose to import your contacts to any dApp which supports the Ceramic protocol. We did the groundwork, so that the social interaction of the blocqchain ecosystem shall soon put both candycrush and instagram in deep shadow.

## Social interaction with zeroTrust, how does that work?

Besides the personal tags, which you can self-define and give to your contacts, our UI fetches **public tags** from the decentralized blockchain event-indexing network theGraph and enriches your contacts with public information on these wallets. Those are 5 indicative and sentimented tags:
```
- friend
- trust
- smartContract
- spam
- fraud
```
While the blockchain is an anonymous space, we see value in uncovering behavior traits of users.
Picture e.g. a wallet got 100 x tagged as `friend`, this wallet would be easier to trust.
On the opposite a wallet tagged with `fraud` might get blacqlisted from exchanges or social interactions.

If you had a confirmed transaction to or from an address (one hop) you are might give that wallet 1 suiting public tag.

## IPFS & Spheron

IPFS makes the core of the Blocq☎️book.
The contact-data is stored and retrieved from the Ceramic network, which operates on IPFS.
Decentralized file transfer and storage is empowered by Web3storage with a generous limit of 1TB.
To top the cherry, the UI is deployed via Spheron on the Filecoin network, keeping it out of reach of censoring or capitalizing hands 👋🏾
In other words: Neither the Blocq☎️book, nor your personal web3-contact-DB can be taken down, you better start using it!  

## AWS, A tiny dash of good old centralization


As much as we all would like to live in Ponyland, reality usually teaches us hard facts.
Through all their perks, we could not yet find a way to decentralize a secure backend.
Storing wallet keys on a static website would open the door for malicious actors to abuse both the storage and public tagging system.
In necessity of a secure backend, we turned to AWS where the Blocq☎️book API is deployed.

Being thankful implies having successfully surpassed a challenge, thus with this metaphor in mind we would like to round up this hackathon with a big **ThankYou** to the the generous sponsors IPFS, AWS and Polygon 💜  


![bbbye](/public/logov2/booqName/blocqbookN.png)