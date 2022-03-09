import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'

import noReports from 'src/assets/images/no-reports.svg'

interface NoReportsPropsType {
  title?: string
  description?: string
}
export const NoReports = ({ title, description }: NoReportsPropsType) => (
  <Flex h="80%" alignItems="center" justifyContent="center">
    <Box w={500} textAlign="center">
      <Heading>{title || 'No reports'}</Heading>
      <Text>
        {description ||
          'Currently you have no data for the reports to be generated. ' +
            'Once you start generating traffic through the Balance application' +
            'the reports will be shown.'}
      </Text>
      <Image src={noReports} alignSelf="center" margin="50px auto 0 auto" />
    </Box>
  </Flex>
)
