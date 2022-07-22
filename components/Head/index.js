import { default as HeadContainer } from 'next/head'

export const Head = () => {
  return (
    <div>
      <HeadContainer>
        <title>Blocq☎️book</title>
        <meta
          name="description"
          content="Your Phonebook for all Blocqchains."
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </HeadContainer>
    </div>
  )
}

export default Head
