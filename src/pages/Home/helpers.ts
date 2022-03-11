import groupBy from 'lodash/groupBy'

import { GatewayQueryType } from 'src/domains/gateways/types'
import { ProjectQueryType } from 'src/domains/projects/types'
import { ReportQueryType, ReportType } from 'src/domains/report/types'

// Group reports results by Project ID
export const getReportByProject = (data: ReportQueryType | undefined) => groupBy(data, 'projectId')

// Group reports results by Gateway ID
export const getReportByGateway = (data: ReportQueryType | undefined) => groupBy(data, 'gatewayId')

// Match project id with project name
export const getProjectNameById = (projects: ProjectQueryType | undefined, id: string) =>
  projects?.find((project) => project?.projectId === id)?.name

// Match gateways id with gateway name
export const getGatewayNameById = (gateways: GatewayQueryType | undefined, id: string) =>
  gateways?.find((gw) => gw?.gatewayId === id)?.name

// Loops through all transactions and returns the total amount of all transactions
export const getTotalAmount = (data: ReportType[] | undefined) =>
  data && data.reduce((acc, curr) => acc + curr.amount, 0)
