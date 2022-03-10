import { Box } from '@chakra-ui/react'
import { FC } from 'react'
import { PieChart as MinPieChart } from 'react-minimal-pie-chart'

export type ChartDataType = Array<{ title: string; value: number; color: string }>

export interface PieChartPropsType {
  data: ChartDataType
}

export const PieChart: FC<PieChartPropsType> = ({ data }) => (
  <Box w="90%" alignSelf="flex-start">
    <MinPieChart
      style={{
        fontFamily: 'Roboto, sans-serif',
        fontSize: '8px',
      }}
      data={data}
      radius={MinPieChart.defaultProps.radius - 5}
      lineWidth={45}
      segmentsStyle={{ transition: 'stroke .5s', cursor: 'pointer' }}
      animate
      label={({ dataEntry }) => `${Math.round(dataEntry?.percentage)}%`}
      labelPosition={75}
      labelStyle={{
        fill: '#fff',
        opacity: 0.9,
        pointerEvents: 'none',
      }}
    />
  </Box>
)
