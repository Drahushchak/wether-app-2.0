// Need to use the React-specific entry point to import createApi
import { ILocale, IWeather } from '@/types/weather'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface GetWeatherByCountryQuery {
  country: string
  start: string
  end: string
  limit?: number
  offset?: number
}

// Define a service using a base URL and expected endpoints
export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (builder) => ({
    getCountriesByPrompt: builder.query<ILocale[], string>({
      query: (prompt) => `locale?prompt=${prompt}`,
    }),
    getWeatherByCountry: builder.query<IWeather[], GetWeatherByCountryQuery>({
      query: (query) => {
        const { country, start, end, limit, offset } = query
        const params = new URLSearchParams({
          start,
          end,
          limit: limit?.toString() || '10',
          offset: offset?.toString() || '0',
        })
        return `weather/${country}?${params.toString()}`
      },
    }),
  }),
})
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCountriesByPromptQuery, useGetWeatherByCountryQuery } = weatherApi
