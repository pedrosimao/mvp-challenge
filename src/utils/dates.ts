import { format, parseISO } from 'date-fns'

export const dateToString = (date: Date): string => format(date, 'yyyy-mm-dd')

export const stringToDate = (date: string): Date => parseISO(date)
