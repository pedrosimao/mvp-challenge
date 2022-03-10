import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  Select,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react'
import groupBy from 'lodash/groupBy'
import map from 'lodash/map'
import { useEffect, useState } from 'react'
import { MdArrowDropDown, MdOutlineDateRange } from 'react-icons/md'

import { DateButton } from 'src/components/DateButton'
import { NoReports } from 'src/components/NoReports'
import { ChartDataType, PieChart } from 'src/components/PieChart'
import { ThemeToggleButton } from 'src/components/ThemeToggleButton'
import { useGetGateways } from 'src/domains/gateways'
import { useGetProjects } from 'src/domains/projects'
import { useReport } from 'src/domains/report'
import { ReportBodyType, ReportQueryType, ReportType } from 'src/domains/report/types'
import { getRandomColor } from 'src/utils/charts'
import { dateToString } from 'src/utils/dates'

export const App = (): JSX.Element => {
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

  const getReportByProject = (data: ReportQueryType | undefined) => groupBy(data, 'projectId')
  const getReportByGateway = (data: ReportQueryType | undefined) => groupBy(data, 'gatewayId')
  const getProjectNameById = (id: string) =>
    projects?.find((project) => project?.projectId === id)?.name
  const getGatewayNameById = (id: string) => gateways?.find((gw) => gw?.gatewayId === id)?.name

  const getTotalAmount = (data: ReportType[] | undefined) =>
    data && data.reduce((acc, curr) => acc + curr.amount, 0)

  const handleGenerateChart = () => {
    const newData = map(groupedItems, (item, key) => ({
      title: shouldGroupByGateway ? getGatewayNameById(key) : getProjectNameById(key),
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
  const accordionButtonBg = useColorModeValue('white', 'gray.500')

  useEffect(() => {
    getNewReport()
    setChartData(undefined)
    // @eslint-disable-next-line react-hooks/exhaustive-deps
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
                    {projectId ? getProjectNameById(projectId) : 'All Projects'} |{' '}
                    {gatewayId ? getGatewayNameById(gatewayId) : 'All Gateways'}
                  </Heading>
                  {reportLoading ? (
                    <Flex w="100%" padding={50} alignItems="center">
                      <Spinner margin="150px auto" />
                    </Flex>
                  ) : (
                    <Accordion allowMultiple={false} allowToggle>
                      {/* Loop through different Collapsible */}
                      {map(groupedItems, (groupedItem, groupId) => {
                        // Get Project Name or Gateway Name
                        const fullProjectName = shouldGroupByGateway
                          ? getGatewayNameById(groupId)
                          : getProjectNameById(groupId)
                        return (
                          <AccordionItem
                            borderWidth={0}
                            borderColor={accordionBg}
                            key={`Accordion-${groupId}`}
                          >
                            <h2>
                              <AccordionButton>
                                <Flex
                                  w="100%"
                                  direction="row"
                                  justifyContent="space-between"
                                  padding="26px"
                                  bg={accordionButtonBg}
                                  borderRadius={10}
                                >
                                  <Text fontWeight={700} fontSize={16}>
                                    {fullProjectName}
                                  </Text>
                                  <Text fontWeight={700} fontSize={16}>
                                    {/* @ts-ignore Todo: investigate why this type has a bug */}
                                    TOTAL: {getTotalAmount(groupedItem).toFixed(0)} USD
                                  </Text>
                                </Flex>
                              </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                              <Table variant="striped" colorScheme="dataTableScheme">
                                <Thead>
                                  <Tr>
                                    <Th>Date</Th>
                                    {gatewayId || shouldGroupByGateway ? null : <Th>Gateway</Th>}
                                    <Th>Transaction Id</Th>
                                    <Th isNumeric>Amount</Th>
                                  </Tr>
                                </Thead>
                                <Tbody>
                                  {groupedItem?.map((oneProject: ReportType) => {
                                    const gatewayName = getGatewayNameById(oneProject?.gatewayId)
                                    return (
                                      <Tr key={oneProject.paymentId}>
                                        <Td>{oneProject?.created}</Td>
                                        {gatewayId || shouldGroupByGateway ? null : (
                                          <Td>{gatewayName}</Td>
                                        )}
                                        <Td>{oneProject?.paymentId}</Td>
                                        <Td isNumeric>{oneProject?.amount?.toFixed(0)} USD</Td>
                                      </Tr>
                                    )
                                  })}
                                </Tbody>
                              </Table>
                            </AccordionPanel>
                          </AccordionItem>
                        )
                      })}
                    </Accordion>
                  )}
                </Box>
                <Box bg={accordionBg} borderRadius={10} margin="30px auto" padding={17}>
                  <Text fontSize={16} fontWeight={700}>
                    TOTAL: {getTotalAmount(report)?.toFixed(0)} USD
                  </Text>
                </Box>
              </Box>
            ) : null}
            {report && chartData ? <PieChart data={chartData} /> : null}
          </Flex>
        ) : null}
      </Box>
      <ThemeToggleButton pos="fixed" bottom="2" right="2" />
    </Box>
  )
}
