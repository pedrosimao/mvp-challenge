import axios, { AxiosError } from 'axios'
import { useMutation } from 'react-query'

import * as t from './types'

const postReport = async (body: t.ReportBodyType): Promise<t.ReportQueryType> => {
  const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/report`, body)
  return data.data
}

export const useReport = () =>
  useMutation<t.ReportQueryType, AxiosError, t.ReportBodyType>(['report'], postReport)
