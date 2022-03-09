import { Box, Button, Flex, Heading, Select, Text } from '@chakra-ui/react'

import { NoReports } from 'src/components/NoReports'
import { ThemeToggleButton } from 'src/components/ThemeToggleButton'

export const App = (): JSX.Element => (
  <Box>
    <Box as="header" h="100vh" margin="0 auto">
      {/* Header */}
      <Flex as="header" direction="row" justifyContent="space-between" w="95%">
        <Flex direction="column">
          <Heading as="h2" fontSize={24}>
            Reports
          </Heading>
          <Text fontWeight={700} fontSize={16} color="#7E8299">
            Easily generate a report of your transactions
          </Text>
        </Flex>
        <Flex minW={700} alignItems="center">
          <Select placeholder="Select Project" w={150}>
            <option>Project 1</option>
            <option>Project 2</option>
            <option>Project 3</option>
          </Select>
          <Select placeholder="Select Gateway" w={150} colorScheme="brand" marginLeft={23}>
            <option>Gateway 1</option>
            <option>Gateway 2</option>
            <option>Gateway 3</option>
          </Select>
          <Button w={140} variant="primary" marginLeft={23}>
            From Date
          </Button>
          <Button w={140} variant="primary" marginLeft={23}>
            To Date
          </Button>
          <Button w={140} variant="secondary" marginLeft={23}>
            Generate Report
          </Button>
        </Flex>
      </Flex>
      <NoReports />
    </Box>
    <ThemeToggleButton pos="fixed" bottom="2" right="2" />
  </Box>
)
