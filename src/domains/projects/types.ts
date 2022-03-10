export interface ProjectType {
  description: string
  gatewayIds: string[]
  image: string
  industry: string
  name: string
  projectId: string
  rule: string
  structure: string
  userIds: string[]
  website: string
}

export type ProjectQueryType = ProjectType[]
