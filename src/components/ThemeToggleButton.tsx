import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { IconButton, IconButtonProps, useColorMode } from '@chakra-ui/react'
import styled from '@emotion/styled/macro'

import { transientOptions } from 'src/utils/general'

// PROP TYPES
type ThemeToggleButtonProps = Omit<IconButtonProps, 'aria-label'>

// CONSTS and LETS
const iconSize = 20

const RoundButton = styled(IconButton, transientOptions)`
  box-shadow: 0 0 50px 2px ${({ $colorMode }) => ($colorMode === 'light' ? 'black' : 'white')};
  & svg {
    width: ${iconSize}px;
    height: ${iconSize}px;
  }
`

export const ThemeToggleButton = (props: ThemeToggleButtonProps): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <RoundButton
      $colorMode={colorMode}
      onClick={toggleColorMode}
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      aria-label={`Activate ${colorMode === 'light' ? 'dark' : 'light'} mode`}
      isRound
      {...props}
    />
  )
}
