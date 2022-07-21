//  The bundled api for covalent calls

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { ALL_SUPPORTED_CHAIN_IDS } from '../constants/uniswap/chains.ts'


const chainIds = ALL_SUPPORTED_CHAIN_IDS
console.log('chainIds', chainIds)


const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
    // Assume url is a list of urls
    async ({ url, method, data, params }) => {
      // This attaches the api key to every request
      if (params) {
        params['key'] = process.env.NEXT_PUBLIC_COVALENT_API_KEY
      } else {
        params = { key: process.env.NEXT_PUBLIC_COVALENT_API_KEY }
      }
      try {
        const result = []
        // Covalent limits to 5 request per second
        for (let x_urls = 0; x_urls < url.length; x_urls = x_urls + 5) {
          // parallelize to make it faster, inspired here: https://www.storyblok.com/tp/how-to-send-multiple-requests-using-axios
          const requests =
            await axios.all(
              url.slice(x_urls, x_urls + 5).map((endpoint) => {
                return axios({
                  'url': baseUrl + endpoint,
                  method,
                  data,
                  params,
                })
              })
            ).then(
              axios.spread((...responses) => {
                responses.forEach((response) => { result.push(response.data.data) })
              })).catch((error) => {
                console.log('error', error)
              })
        }
        return { data: result }
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
      query: ({ address, chain_id }) => ({
        url: [chain_id + `/address/${address}/transactions_v2/`],
        responseHandler: (response) => response[0],
      }),
    }),
    // PlanB: https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#examples---queryfn
    getAllTransactions: builder.query({
      query: ({ address }) => ({
        // Map all supported covalent chains
        url: chainIds.map(
          (chain_id) => `${chain_id}/address/${address}/transactions_v2/`
        ),
        // async queryFn({ address }, _api, _extraOptions, fetch) {
        // }
      }),
    }),
    getTokenBalances: builder.query({
      query: ({ address, chain_id }) => ({
        url: [chain_id + `/address/${address}/balances_v2/`],
        responseHandler: (response) => response[0],
      }),
    }),
    getAllTokenBalances: builder.query({
      query: ({ address }) => ({
        url: chainIds.map(
          (chain_id) => `${chain_id}/address/${address}/balances_v2/`
        ),
      }),
    }),
  }),
})

export const {
  useGetTransactionsQuery,
  useGetAllTransactionsQuery,
  useGetAllTokenBalancesQuery,
  useLazyGetAllTokenBalancesQuery,
  useGetTokenBalancesQuery,
} = covApi
