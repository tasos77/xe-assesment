import axios from 'axios'

// define response schema
export interface SearchResponse {
  placeId: string
  mainText: string
  secondaryText: string
}

// define data schema
export interface StoreData {
  title: string
  type: string
  area: string
  placeId: string
  amount: number
  description?: string
}

// define get all data schema
export interface ShowData {
  title: string
  type: string
  area: string
  placeId: string
  amount: number
  description?: string
  createdAt: Date
}

export interface Api {
  search: (query: string) => Promise<SearchResponse[] | Error>
}

// create axios client instance
export const useApi = () => {
  const client = axios.create({
    baseURL: 'http://localhost:3000/api/v1'
  })

  // define search api call
  const search = async (query: string): Promise<SearchResponse[] | Error> => {
    return client
      .get(`/search?input=${query}`)
      .then((response) => response.data)
      .catch((error) => new Error(`API error: ${error.message}`))
  }

  // define store api call
  const store = async (adData: StoreData) => {
    return client.post('/store', adData).catch((error) => new Error(`API error: ${error.message}`))
  }

  // define get all api call
  const getAll = async (): Promise<ShowData[] | Error> => {
    return client
      .get('/show')
      .then((response) => response.data)
      .catch((error) => new Error(`API error: ${error.message}`))
  }

  return { search, store, getAll }
}
