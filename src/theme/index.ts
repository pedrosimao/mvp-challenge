// Component style overrides
import { extendTheme, ThemeConfig, withDefaultColorScheme } from '@chakra-ui/react'

import { Button } from './components/button'
// Foundational style overrides
// import borders from './foundations/borders'
import { colors } from './foundations/colors'

// Global style overrides
import { styles } from './styles'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const overrides = {
  config,
  styles,
  colors,
  // borders,
  // Other foundational style overrides go here
  components: {
    Button,
    // Other components go here
  },
}

export default extendTheme(overrides, withDefaultColorScheme({ colorScheme: 'brand' }))
