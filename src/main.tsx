import '@fontsource/roboto'

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import { HomePage } from 'src/pages/Home'
import theme from 'src/theme'

// Create a React-Query client
const queryClient = new QueryClient()

ReactDOM.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root'),
)
