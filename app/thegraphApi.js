import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// TODO
// Define a service using a base URL and expected endpoints
export const thegraphApi = createApi({
  reducerPath: 'thegraphApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/thegraphurl/',
  }),
  endpoints: (builder) => ({
    getTags: builder.query({
      query: ({ address }) => `${address}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTagsQuery } = thegraphApi
