import { ThemeProviderProps } from '@chakra-ui/react'
import { darken, mode, whiten } from '@chakra-ui/theme-tools'

export const Button = {
  // style object for base or default style
  // baseStyle: {},
  // styles for different sizes ("sm", "md", "lg")
  // sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    primary: (props: ThemeProviderProps) => ({
      bg: 'primary',
      color: 'white',
      _hover: {
        bg: mode(darken('primary', 20), whiten('primary', 20))(props),
        boxShadow: 'md',
      },
    }),
    primaryOutline: {
      bg: 'transparent',
      border: '1px solid',
      borderColor: 'primary',
      color: 'primary',
      _hover: {
        transform: 'scale(1.02)',
        boxShadow: 'md',
      },
    },
    secondary: (props: ThemeProviderProps) => ({
      bg: 'secondary',
      color: 'white',
      _hover: {
        bg: mode(darken('secondary', 20), whiten('secondary', 20))(props),
        boxShadow: 'md',
      },
    }),
    secondaryOutline: {
      bg: 'transparent',
      border: '1px solid',
      borderColor: 'secondary',
      color: 'secondary',
      _hover: {
        transform: 'scale(1.02)',
        boxShadow: 'md',
      },
    },
  },
  // default values for `size` and `variant`
  // defaultProps: {
  //   size: '',
  //   variant: '',
  // },
}
