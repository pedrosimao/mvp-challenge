export interface GatewayType {
  apiKey: string
  description: string
  gatewayId: string
  name: string
  secondaryApiKey: string
  type: string
  userIds: string[]
}

export type GatewayQueryType = GatewayType[]
