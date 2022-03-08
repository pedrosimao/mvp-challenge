import axios, { AxiosError } from 'axios'
import { useQuery } from 'react-query'

import * as t from './types'

const getGateways = async (): Promise<t.GatewayQueryType> => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/gateways`)
  return data.data
}

export const useGetGateways = () =>
  useQuery<t.GatewayQueryType, AxiosError>(['gateways'], getGateways)
