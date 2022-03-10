import { Box, Button, Flex, Heading, Select, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { DateButton } from 'src/components/DateButton'
import { NoReports } from 'src/components/NoReports'
import { ThemeToggleButton } from 'src/components/ThemeToggleButton'
import { useGetGateways } from 'src/domains/gateways'
import { useGetProjects } from 'src/domains/projects'
import { useReport } from 'src/domains/report'
import { ReportBodyType } from 'src/domains/report/types'
import { dateToString } from 'src/utils/dates'

export const App = (): JSX.Element => {
  const { data: projects, isLoading: projectsLoading } = useGetProjects()
  const { data: gateways, isLoading: gatewaysLoading } = useGetGateways()
  const { data: report, mutateAsync: mutateReport } = useReport()
  const [projectId, setProjectId] = useState<ReportBodyType['projectId']>(undefined)
  const [gatewayId, setGatewayId] = useState<ReportBodyType['gatewayId']>(undefined)
  const [to, setTo] = useState<ReportBodyType['to']>('')
  const [from, setFrom] = useState<ReportBodyType['from']>('')

  const getNewReport = async () => {
    const body = {
      from,
      to,
      projectId,
      gatewayId,
    }
    const res = await mutateReport(body)
    // eslint-disable-next-line no-console
    console.log({ report, res })
  }

  useEffect(() => {
    getNewReport()
  }, [projectId, gatewayId, to, from])

  return (
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
            <Select
              placeholder="Select Project"
              w={150}
              disabled={!projects || projectsLoading}
              // @ts-ignore If backend is always providing the correct type, this should be fine
              onChange={(e) => setProjectId(e?.target?.value)}
            >
              {projects && projects?.length > 0
                ? projects.map((project) => (
                    <option key={project.projectId} value={project.projectId}>
                      {project.name}
                    </option>
                  ))
                : null}
            </Select>
            <Select
              placeholder="Select Gateway"
              w={150}
              colorScheme="brand"
              marginLeft={23}
              disabled={!gateways || gatewaysLoading}
              // @ts-ignore If backend is always providing the correct type, this should be fine
              onChange={(e) => setGatewayId(e?.target?.value)}
            >
              {gateways && gateways?.length > 0
                ? gateways.map((gateway) => (
                    <option key={gateway.gatewayId} value={gateway.gatewayId}>
                      {gateway.name}
                    </option>
                  ))
                : null}
            </Select>
            <DateButton
              w={140}
              variant="primary"
              margin="0 0 0 23px"
              onChangeDate={(date) => {
                setFrom(dateToString(date))
              }}
            >
              From Date
            </DateButton>
            <DateButton
              w={140}
              variant="primary"
              margin="0 0 0 23px"
              onChangeDate={(date) => {
                setTo(dateToString(date))
              }}
            >
              To Date
            </DateButton>
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
}
