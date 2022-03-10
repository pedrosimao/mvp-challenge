import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { render, RenderOptions } from '@testing-library/react'
import { ReactChild, ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import theme from 'src/theme'

const queryClient = new QueryClient()

interface PropsType {
  children: ReactChild
}

/**
 * Returns a Provider component with all the necessary providers.
 * Accepts arguments to modify the initial values
 * of these providers.
 */
// @ts-ignore testing library has buggy types: it requires a wrapper to be
// React.FunctionComponent<unknown>, which doesn't make sense
const AllTheProviders: () => FunctionComponent<unknown> =
  () =>
  // eslint-disable-next-line react/display-name
  ({ children }: PropsType) =>
    (
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </ChakraProvider>
    )

/**
 * @param ui the component to render
 * @param options additional react-testing-library options
 */
export const wrappedRender = (ui: ReactElement, options?: Partial<RenderOptions>) =>
  render(ui, { wrapper: AllTheProviders(), ...options })
