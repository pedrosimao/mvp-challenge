import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { FC } from 'react'
import { PieChart as MinPieChart } from 'react-minimal-pie-chart'

export type ChartDataType = Array<{ title: string; value: number; color: string }>

export interface PieChartPropsType {
  data: ChartDataType
}

export const PieChart: FC<PieChartPropsType> = ({ data }) => {
  const getTotal = () => data.reduce((acc, curr) => acc + curr.value, 0)
  const accordionBg = useColorModeValue('dataTable', 'gray.700')
  return (
    <Flex w="100%" direction="column" alignSelf="flex-start" margin="30px 0 0 30px">
      <Flex marginBottom={15} bg={accordionBg} padding={18} borderRadius={10}>
        {data.map((item) => (
          <Flex w="100%" key={item.value} justifyContent="space-between">
            <Flex>
              <Box borderRadius={5} w={5} h={5} bg={item.color} marginRight={2} />
              <Text>{item.title}</Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
      <Box w="60%" margin="20px auto">
        <MinPieChart
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: '7px',
          }}
          data={data}
          radius={MinPieChart.defaultProps.radius - 5}
          lineWidth={45}
          segmentsStyle={{ transition: 'stroke .5s', cursor: 'pointer' }}
          animate
          label={({ dataEntry }) => `${Math.round(dataEntry?.percentage)}%`}
          labelPosition={78}
          labelStyle={{
            fill: '#fff',
            opacity: 0.9,
            pointerEvents: 'none',
          }}
        />
      </Box>
      {/* <Box>TOTAL: {getTotal().toFixed(0)} USD</Box> */}
    </Flex>
  )
}
