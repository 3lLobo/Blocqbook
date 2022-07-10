import fs from 'fs'

export default function handler(req, res) {
  const URL = './ceramic.config.json'
  const streamIds = JSON.parse(fs.readFileSync(URL, 'utf-8'))
  switch (req.method) {
    case 'POST':
      streamIds[req.query.DID] = req.body
      fs.writeFileSync(URL, JSON.stringify(streamIds))
      res.status(200).json({ success: true })
      break
    case 'GET':
      const streamId = streamIds[req.query.DID]
      if (streamId) {
        res.status(200).json(streamId)
      } else {
        res.status(200).json('')
      }
      break
    default:
      console.log(`Method ${req.method} not supported on /api/ceramic/[DID]`)
      break
  }
}
