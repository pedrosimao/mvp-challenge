import axios, { AxiosError } from 'axios'
import { useQuery } from 'react-query'

import * as t from './types'

const getProjects = async (): Promise<t.ProjectQueryType> => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/projects`)
  return data.data
}

export const useGetProjects = () =>
  useQuery<t.ProjectQueryType, AxiosError>(['projects'], getProjects)
