import { StringOfLength } from 'src/utils/typescript/ts-length'

export interface ReportType {
  amount: number
  created: string // formatted as yyyy-mm-dd format
  gatewayId: StringOfLength<5, 5>[]
  modified: string // formatted as yyyy-mm-dd format
  paymentId: string
  projectId: StringOfLength<5, 5>[]
  userIds: StringOfLength<5, 5>[]
}

export interface ReportBodyType {
  from: string // formatted as yyyy-mm-dd format
  to: string // formatted as yyyy-mm-dd format
  projectId?: StringOfLength<5, 5>
  gatewayId?: StringOfLength<5, 5>
}

export type ReportQueryType = readonly ReportType[]
