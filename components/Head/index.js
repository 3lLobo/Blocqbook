import { default as HeadContainer } from 'next/head'

export const Head = () => {
  return (
    <div>
      <HeadContainer>
        <title>Blocqchain☎️book</title>
        <meta
          name="description"
          content="Manage your blockchain acquittances."
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </HeadContainer>
    </div>
  )
}

export default Head
