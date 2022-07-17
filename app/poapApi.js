import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const poapApi = createApi({
  reducerPath: 'poapApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.poap.tech/actions/',
    headers: {
      Accept: 'application/json',
      'X-API-Key': process.env.NEXT_PUBLIC_POAP_API_KEY,
    },
  }),
  endpoints: (builder) => ({
    getPoaps: builder.query({
      query: (address) => `scan/${address}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPoapsQuery } = poapApi
