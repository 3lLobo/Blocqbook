//  The bundled api for covalent calls

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'

// TODO: add all covalent chains. Also add timer considering requests/second limit
const chainIds = [1, 42, 250, 80001]

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params }) => {
    // This attaches the api key to every request
    // Assume url is a list of urls
    if (params) {
      params['key'] = process.env.NEXT_PUBLIC_COVALENT_API_KEY
    } else {
      params = { key: process.env.NEXT_PUBLIC_COVALENT_API_KEY }
    }
    try {
      const result = []
      for (let x in url) {
        const res = await axios({
          url: baseUrl + url[x],
          method,
          data,
          params,
        })
        result.push(res.data.data)
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
