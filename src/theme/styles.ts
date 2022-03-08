import { ThemeProviderProps } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

export const styles = {
  global: (props: ThemeProviderProps) => ({
    body: {
      fontFamily: 'body',
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('white', 'gray.800')(props),
      lineHeight: 'base',
    },
  }),
} as const
