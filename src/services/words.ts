// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const wordsApi = createApi({
  reducerPath: 'wordsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `https://random-word-api.herokuapp.com/` }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<any, string>({
      query: (count) => `word?number=${count}&length=5`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = wordsApi