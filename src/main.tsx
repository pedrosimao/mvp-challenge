import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import theme from 'src/theme'

import { App } from './App'

ReactDOM.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root'),
)
