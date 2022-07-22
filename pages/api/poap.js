import fs from 'fs'

//Dispenser of URLs. We have 100 assigned. Now it's on dev mode
//I have made a 'config.poap copy' so we don't waste urls

//If we claim an NFT we need to delete the copy and make a copy
//of the functional one.

export default function handler(req, res) {
  const URL = './config.poap.json'
  switch (req.method) {
    case 'GET':
      const urls = JSON.parse(fs.readFileSync(URL, 'utf-8'))
      const url = urls.pop()
      fs.writeFileSync(URL, JSON.stringify(urls))
      res.status(200).json(url)
      break
    default:
      console.log(`Method ${req.method} not supported on /api/poap`)
      break
  }
}
