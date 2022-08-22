import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { useGetTagsQuery } from '../app/thegraphApi'
import { publicTags } from '../components/Profile/PubTags'
import { Tag } from '../components/Profile/Tag'

export function usePublicTags({ contact }) {
  const address = contact.bio.address
  const [uiTags, setUiTags] = useState(null)
  const {
    data: pubTags,
    error,
    isLoading,
  } = useGetTagsQuery(address ? { address } : skipToken, {
    refetchOnFocus: true,
    refetchOnReconnect: false,
  })

  useEffect(() => {
    if (pubTags) {
      const copyPubTags = [...pubTags]
      const readyTags = matchPubTag(copyPubTags, contact)
      setUiTags(() => readyTags)
    }
  }, [pubTags, contact])

  return { uiTags, pubTags, error, isLoading }
}
// Find the matchgin tag, check if the user has already selected it and add the count of the tag.
function matchPubTag(graphTag, contact) {
  // are the fetched tags in our database?
  const tags2show = graphTag?.map((tag) => {
    var matchedTag =
      publicTags.filter((stdtag) => {
        if (stdtag.name === tag.name) {
          return stdtag
        }
      })[0] || undefined
    // Did we get a match?
    if (matchedTag === undefined) {
      return
    }
    // Is the tag already selected by the user?
    const isPub = !contact.tags.pubTags.map((t) => t.id).includes(matchedTag.id)
    matchedTag['count'] = Number(tag.count)
    matchedTag['isPub'] = isPub
    return matchedTag
  })
  // Check if the user has has given tags which were not recorded in the graph.
  // This should not be the case and will be temporary
  const remainingTags = contact.tags.pubTags.filter((tag) => {
    if (!tags2show?.map((t) => t.id).includes(tag.id)) {
      return tag
    }
  })

  const concatTags = [...tags2show, ...remainingTags]

  // retrun kant-en-klar components!
  return concatTags.map((tag) => {
    return (
      <div key={v4()}>
        {tag && (
          <Tag
            tagText={tag.name}
            color={tag.color}
            count={tag.count || undefined}
            isPub={tag.isPub}
          />
        )}
      </div>
    )
  })
}
