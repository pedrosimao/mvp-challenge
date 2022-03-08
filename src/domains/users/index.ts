import axios, { AxiosError } from 'axios'
import { useQuery } from 'react-query'

import * as t from './types'

const getUsers = async (): Promise<t.UsersQueryType> => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users`)
  return data.data
}

export const useGetUsers = () => useQuery<t.UsersQueryType, AxiosError>(['users'], getUsers)
