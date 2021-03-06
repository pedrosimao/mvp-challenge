import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import map from 'lodash/map'
import { useEffect, useState } from 'react'
import { MdArrowDropDown, MdOutlineDateRange } from 'react-icons/md'

import { AccordionTable } from 'src/components/AccordionTable'
import { DateButton } from 'src/components/DateButton'
import { NoReports } from 'src/components/NoReports'
import { ChartDataType, PieChart } from 'src/components/PieChart'
import { ThemeToggleButton } from 'src/components/ThemeToggleButton'
import { useGetGateways } from 'src/domains/gateways'
import { useGetProjects } from 'src/domains/projects'
import { useReport } from 'src/domains/report'
import { ReportBodyType } from 'src/domains/report/types'
import { getRandomColor } from 'src/utils/charts'
import { dateToString } from 'src/utils/dates'

import {
  getGatewayNameById,
  getProjectNameById,
  getReportByGateway,
  getReportByProject,
  getTotalAmount,
} from './helpers'

export const HomePage = (): JSX.Element => {
  const { data: projects, isLoading: projectsLoading } = useGetProjects()
  const { data: gateways, isLoading: gatewaysLoading } = useGetGateways()
  const { data: report, isLoading: reportLoading, mutateAsync: mutateReport } = useReport()
  const [projectId, setProjectId] = useState<ReportBodyType['projectId']>(undefined)
  const [gatewayId, setGatewayId] = useState<ReportBodyType['gatewayId']>(undefined)
  const [chartData, setChartData] = useState<ChartDataType | undefined>()
  const [to, setTo] = useState<ReportBodyType['to']>('')
  const [from, setFrom] = useState<ReportBodyType['from']>('')

  const getNewReport = async () => {
    const body = {
      from,
      to: to || dateToString(new Date()),
      projectId,
      gatewayId,
    }
    const res = await mutateReport(body)
    getReportByProject(res)
  }

  const handleGenerateChart = () => {
    const newData = map(groupedItems, (item, key) => ({
      title: shouldGroupByGateway
        ? getGatewayNameById(gateways, key)
        : getProjectNameById(projects, key),
      value: getTotalAmount(item),
      color: getRandomColor(),
    }))
    // @ts-ignore Todo: fix this type
    setChartData(newData)
  }

  const shouldGroupByGateway = projectId && !gatewayId
  const groupedItems = shouldGroupByGateway
    ? getReportByGateway(report)
    : getReportByProject(report)

  const accordionBg = useColorModeValue('dataTable', 'gray.700')

  useEffect(() => {
    getNewReport()
    setChartData(undefined)
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [projectId, gatewayId, to, from])

  return (
    <Box>
      <Box as="main" margin="0 auto" w="100%">
        {/* Header */}
        <Flex as="header" direction="row" justifyContent="space-between" w="90%" margin="10px auto">
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
              bg="primary"
              color="#fff"
              borderColor="primary"
              icon={<MdArrowDropDown />}
              placeholder="All Projects"
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
              bg="primary"
              color="#fff"
              borderColor="primary"
              icon={<MdArrowDropDown />}
              placeholder="All Gateways"
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
              placeholderText="From date"
              variant="primary"
              margin="0 0 0 23px"
              rightIcon={<MdOutlineDateRange />}
              onChangeDate={(date) => {
                setFrom(dateToString(date))
              }}
            >
              From Date
            </DateButton>
            <DateButton
              w={140}
              placeholderText="To date"
              variant="primary"
              margin="0 0 0 23px"
              rightIcon={<MdOutlineDateRange />}
              onChangeDate={(date) => {
                setTo(dateToString(date))
              }}
            >
              To Date
            </DateButton>
            <Button w={140} variant="secondary" marginLeft={23} onClick={handleGenerateChart}>
              Generate Report
            </Button>
          </Flex>
        </Flex>
        {/* No Data available */}
        {report && report.length > 0 ? null : (
          <Flex h={500} alignItems="center" justifyContent="center">
            <NoReports />
          </Flex>
        )}
        {/* Data is available */}
        {report && report.length > 0 ? (
          <Flex w="90%" justifyContent="center" margin="0 auto">
            {/* Table */}
            {groupedItems ? (
              <Box w="100%">
                <Box bg={accordionBg} borderRadius={10} margin="30px auto" paddingBottom={15}>
                  {/* Get correct Table Headers */}
                  <Heading as="h3" fontSize={16} fontWeight={700} padding="18px 0 34px 24px">
                    {projectId ? getProjectNameById(projects, projectId) : 'All Projects'} |{' '}
                    {gatewayId ? getGatewayNameById(gateways, gatewayId) : 'All Gateways'}
                  </Heading>
                  {reportLoading ? (
                    <Flex w="100%" padding={50} alignItems="center">
                      <Spinner margin="150px auto" />
                    </Flex>
                  ) : (
                    <AccordionTable
                      // @ts-ignore Todo: fix lodash groupBy type
                      groupedItems={groupedItems}
                      gateways={gateways}
                      projects={projects}
                      shouldGroupByGateway={shouldGroupByGateway}
                      isGatewayChosen={!!gatewayId}
                    />
                  )}
                </Box>
                {chartData ? null : (
                  <Box bg={accordionBg} borderRadius={10} margin="30px auto" padding={17}>
                    <Text fontSize={16} fontWeight={700}>
                      TOTAL: {getTotalAmount(report)?.toFixed(0)} USD
                    </Text>
                  </Box>
                )}
              </Box>
            ) : null}
            {report && chartData ? (
              <Flex direction="column" width="100%" justifyContent="flex-start">
                <PieChart data={chartData} />
                <Flex
                  bg={accordionBg}
                  borderRadius={10}
                  margin="30px 18px"
                  padding={17}
                  width="100%"
                >
                  <Text fontSize={16} fontWeight={700}>
                    TOTAL: {getTotalAmount(report)?.toFixed(0)} USD
                  </Text>
                </Flex>
              </Flex>
            ) : null}
          </Flex>
        ) : null}
      </Box>
      <ThemeToggleButton pos="fixed" bottom="2" right="2" />
    </Box>
  )
}
