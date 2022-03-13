import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react'
import map from 'lodash/map'
import { FC } from 'react'

import { GatewayQueryType } from 'src/domains/gateways/types'
import { ProjectQueryType } from 'src/domains/projects/types'
import { ReportType } from 'src/domains/report/types'
import { getGatewayNameById, getProjectNameById, getTotalAmount } from 'src/pages/Home/helpers'

export interface AccordionTablePropsType {
  groupedItems: { [key: string]: ReportType[] }[]
  gateways?: GatewayQueryType
  projects?: ProjectQueryType
  shouldGroupByGateway?: boolean
  isGatewayChosen: boolean
}
export const AccordionTable: FC<AccordionTablePropsType> = ({
  groupedItems,
  projects,
  gateways,
  shouldGroupByGateway,
  isGatewayChosen,
}) => {
  const accordionBg = useColorModeValue('dataTable', 'gray.700')
  const accordionButtonBg = useColorModeValue('white', 'gray.500')
  return (
    <Accordion allowMultiple={false} allowToggle>
      {/* Loop through different Collapsible */}
      {map(groupedItems, (groupedItem: ReportType[], groupId) => {
        // Get Project Name or Gateway Name
        const fullProjectName = shouldGroupByGateway
          ? getGatewayNameById(gateways, String(groupId))
          : getProjectNameById(projects, String(groupId))
        return (
          <AccordionItem borderWidth={0} borderColor={accordionBg} key={`Accordion-${groupId}`}>
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
                    {isGatewayChosen || shouldGroupByGateway ? null : <Th>Gateway</Th>}
                    <Th>Transaction Id</Th>
                    <Th isNumeric>Amount</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {groupedItem?.map((oneProject: ReportType) => {
                    const gatewayName = getGatewayNameById(gateways, oneProject?.gatewayId)
                    return (
                      <Tr key={oneProject.paymentId}>
                        <Td>{oneProject?.created}</Td>
                        {isGatewayChosen || shouldGroupByGateway ? null : <Td>{gatewayName}</Td>}
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
  )
}
