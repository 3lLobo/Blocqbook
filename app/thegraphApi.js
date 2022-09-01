import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { request, gql, ClientError } from 'graphql-request'

const graphqlBaseQuery =
  ({ baseUrl }) =>
  async ({ body, variables }) => {
    try {
      const result = await request(baseUrl, body, variables)
      return { data: result }
    } catch (error) {
      if (error instanceof ClientError) {
        return { error: { status: error.response.status, data: error } }
      }
      return { error: { status: 500, data: error } }
    }
  }

// TODO:
// Define a service using a base URL and expected endpoints
export const thegraphApi = createApi({
  reducerPath: 'thegraphApi',
  // baseQuery: fetchBaseQuery({
  //   baseUrl: '/api/theGraph/',
  // }),
  baseQuery: graphqlBaseQuery({
    baseUrl: 'https://api.thegraph.com/subgraphs/name/3llobo/blocqbook',
  }),
  endpoints: (builder) => ({
    // getTags: builder.query({
    //   query: ({ address }) => ({
    //     "url": '/',
    //     "method": 'POST',
    //     "body": { address },
    //   }),

    //   transformResponse: (response) => transformTagQueryResponse(response),
    // }),
    getTags: builder.query({
      query: ({ address }) => ({
        variables: { addressId: address },
        body: gql`
          query Addresses($addressId: ID!) {
            address(id: $addressId) {
              id
              created
              address
              tags {
                id
                tag {
                  id
                  name
                  sentiment
                }
                count
                created
                updated
              }
            }
          }
        `,
      }),
      transformResponse: (response) => transformTagQueryResponse(response),
    }),
  }),
})

function transformTagQueryResponse(response) {
  var tags =
    response.address?.tags?.map((tag) => {
      const resTag = { name: tag.tag.name, count: tag.count }
      return resTag
    }) || []
  if (tags.length > 0) {
    tags = tags.filter((tag) => tag.count > 0)
  }
  return tags
}

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTagsQuery } = thegraphApi
