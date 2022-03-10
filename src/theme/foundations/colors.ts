import { theme as baseTheme } from '@chakra-ui/theme'

export const colors = {
  // Color Schemes
  brand: baseTheme.colors.telegram,
  brandSecondary: baseTheme.colors.orange,
  // Individual Colors
  primary: '#1BC5BD',
  secondary: '#005B96',
  text: {
    default: 'gray.900',
    _dark: 'gray.50',
  },
  heading: {
    default: 'gray.900',
    _dark: 'gray.50',
  },
  dataTable: '#F1FAFE',
  dataTableScheme: { ...baseTheme.colors.gray, 100: '#fff', 700: '#718096' },
}
