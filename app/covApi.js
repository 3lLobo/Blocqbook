//  The bundled api for covalent calls

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import qs from 'qs'


const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
    async ({ url, method, data, params }) => {
      // This attaches the api key to every request
      if (params) {
        params['key'] = process.env.NEXT_PUBLIC_COVALENT_API_KEY
      } else {
        params = { key: process.env.NEXT_PUBLIC_COVALENT_API_KEY }
      }
      try {
        const result = await axios({
          url: baseUrl + url,
          method,
          data,
          params,
          // // This should work like CURL using Basic Auth, but it doesn't
          // auth: {
          //   username: 'process.env.NEXT_PUBLIC_COVALENT_API_KEY',
          //   // password: ''
          // },
        })
        return { data: result.data.data }
      } catch (axiosError) {
        let err = axiosError
        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message,
          },
        }
      }
    }


// Define a service using a base URL and expected endpoints
export const covApi = createApi({
  reducerPath: 'covApi',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://api.covalenthq.com/v1/',
  }),
  // baseQuery: fetchBaseQuery({
  //   baseUrl: 'https://api.covalenthq.com/v1/',
  // }),
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: ({address, chain_id}) => ({
        url: chain_id + `/address/${address}/transactions_v2/`,
        // responseHandler: (response) => response.data,
      }),
    }),
  }),
})


export const { useGetTransactionsQuery } = covApi