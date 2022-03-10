import { format, parseISO } from 'date-fns'

export const dateToString = (date: Date | null): string => {
  if (!date) return ''
  return format(date, 'yyyy-MM-dd')
}

export const stringToDate = (date: string): Date => parseISO(date)
