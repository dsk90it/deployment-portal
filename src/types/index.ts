export interface Deployment {
  id: string
  application: string
  version: string
  environment: 'Production' | 'QA' | 'Development' | 'Staging'
  status: 'Pending' | 'In Progress' | 'Completed'
  requestedBy: string
  requestedAt: string
  scheduledAt: string
  region: string
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
}
