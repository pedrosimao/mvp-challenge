import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import groupBy from 'lodash/groupBy'
import map from 'lodash/map'
import { useEffect, useState } from 'react'
import { MdArrowDropDown, MdOutlineDateRange } from 'react-icons/md'

import { DateButton } from 'src/components/DateButton'
import { NoReports } from 'src/components/NoReports'
import { ThemeToggleButton } from 'src/components/ThemeToggleButton'
import { useGetGateways } from 'src/domains/gateways'
import { useGetProjects } from 'src/domains/projects'
import { useReport } from 'src/domains/report'
import { ReportBodyType, ReportQueryType, ReportType } from 'src/domains/report/types'
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
    getReportByProject(res)
  }

  const getReportByProject = (data: ReportQueryType | undefined) => groupBy(data, 'projectId')
  const getReportByGateway = (data: ReportQueryType | undefined) => groupBy(data, 'gatewayId')
  const getProjectNameById = (id: string) =>
    projects?.find((project) => project?.projectId === id)?.name
  const getGatewayNameById = (id: string) => gateways?.find((gw) => gw?.gatewayId === id)?.name

  const getTotalAmount = (data: ReportType[] | undefined) =>
    data && data.reduce((acc, curr) => acc + curr.amount, 0)

  useEffect(() => {
    getNewReport()
  }, [projectId, gatewayId, to, from])

  const shouldGroupByGateway = projectId && !gatewayId
  const groupedItems = shouldGroupByGateway
    ? getReportByGateway(report)
    : getReportByProject(report)

  return (
    <Box>
      <Box as="header" h="100vh" margin="0 auto">
        {/* Header */}
        <Flex as="header" direction="row" justifyContent="space-between" w="95%" margin="10px auto">
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
              bg="primary"
              color="#fff"
              borderColor="primary"
              icon={<MdArrowDropDown />}
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
            <Button w={140} variant="secondary" marginLeft={23}>
              Generate Report
            </Button>
          </Flex>
        </Flex>
        {groupedItems ? (
          <>
            <Box bg="#F1FAFE" borderRadius={10} w="95%" margin="30px auto">
              {/* Get correct Table Headers */}
              {projectId ? getProjectNameById(projectId) : 'All Projects'} |{' '}
              {gatewayId ? getGatewayNameById(gatewayId) : 'All Gateways'}
              {/* Loop through different Collapsible */}
              {map(groupedItems, (groupedItem, groupId) => {
                // Get Project Name or Gateway Name
                const fullProjectName = shouldGroupByGateway
                  ? getGatewayNameById(groupId)
                  : getProjectNameById(groupId)
                return (
                  <Accordion defaultIndex={[0]} allowMultiple>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Flex w="100%" direction="row" justifyContent="space-between">
                            <span>{fullProjectName}</span>
                            {/* @ts-ignore Todo: investigate why this type has a bug */}
                            <span>Total: {getTotalAmount(groupedItem).toFixed(0)}</span>
                          </Flex>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Table variant="striped" colorScheme="teal">
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
                  </Accordion>
                )
              })}
            </Box>
            <Box bg="#F1FAFE" borderRadius={10} w="95%" margin="30px auto" padding={5}>
              Total: {getTotalAmount(report)?.toFixed(0)} USD
            </Box>
          </>
        ) : null}
        {report ? null : <NoReports />}
      </Box>
      <ThemeToggleButton pos="fixed" bottom="2" right="2" />
    </Box>
  )
}
