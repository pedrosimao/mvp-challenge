import { Box, Button, Flex, Image, Link, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState } from 'react'

import { ThemeToggleButton } from 'src/components/ThemeToggleButton'

import logo from './logo.svg'

const textFontSizes = [16, 18, 24, 30]

export const App = (): JSX.Element => {
  const [count, setCount] = useState(0)

  return (
    <Box>
      <Flex
        as="header"
        direction="column"
        alignItems="center"
        justifyContent="center"
        h="100vh"
        fontSize="3xl"
      >
        <motion.div
          animate={{ rotateZ: 360 }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: 'linear',
          }}
        >
          <Image src={logo} alt="" h="40vmin" />
        </motion.div>
        <Text fontSize={textFontSizes}>Hello Vite + React + Typescript + Chakra UI!</Text>
        <Button
          variant="primaryOutline"
          fontSize={textFontSizes}
          onClick={() => setCount((c) => c + 1)}
          marginTop="2"
        >
          count: {count}
        </Button>
        <Text fontSize={textFontSizes}>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </Text>
        <Text fontSize={textFontSizes}>
          <Link href="https://reactjs.org" isExternal color="primary">
            Learn React
          </Link>
          {' | '}
          <Link href="https://vitejs.dev/guide/features.html" isExternal>
            Vite Docs
          </Link>
          {' | '}
          <Link href="https://www.typescriptlang.org/" isExternal color="#61dafb">
            Typescript
          </Link>
          {' | '}
          <Link href="https://chakra-ui.com" isExternal color="#61dafb">
            Chakra UI
          </Link>
        </Text>
      </Flex>
      <ThemeToggleButton pos="fixed" bottom="2" right="2" />
    </Box>
  )
}
