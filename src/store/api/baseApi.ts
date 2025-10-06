import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Party'],
  endpoints: () => ({}),
})

export type { BaseQueryFn } from '@reduxjs/toolkit/query'


