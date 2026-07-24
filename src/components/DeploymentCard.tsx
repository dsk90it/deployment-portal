import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { Deployment } from '@/types'

interface DeploymentCardProps {
  deployment: Deployment
}

const nextStatusMap = {
  Pending: 'In Progress',
  'In Progress': 'Completed',
  Completed: null,
} as const

const statusBadgeVariant = {
  Pending: 'secondary',
  'In Progress': 'default',
  Completed: 'outline',
} as const

const environmentBadgeVariant = {
  Production: 'destructive',
  QA: 'secondary',
  Development: 'outline',
  Staging: 'default',
} as const

const priorityBadgeVariant = {
  Low: 'outline',
  Medium: 'secondary',
  High: 'default',
  Critical: 'destructive',
} as const

const formatDate = (date: string) =>
  new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

const DeploymentCard = ({ deployment }: DeploymentCardProps) => {
  const nextStatus = nextStatusMap[deployment.status]
  const deploymentInfo = [
    {
      label: 'Version',
      value: deployment.version,
    },
    {
      label: 'Environment',
      value: <Badge variant={environmentBadgeVariant[deployment.environment]}>{deployment.environment}</Badge>,
    },
    {
      label: 'Status',
      value: <Badge variant={statusBadgeVariant[deployment.status]}>{deployment.status}</Badge>,
    },
  ]
  const metadata = [
    {
      label: 'Requested By',
      value: deployment.requestedBy,
    },
    {
      label: 'Requested At',
      value: formatDate(deployment.requestedAt),
    },
    {
      label: 'Scheduled At',
      value: formatDate(deployment.scheduledAt),
    },
    {
      label: 'Region',
      value: deployment.region,
    },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>{deployment.application}</CardTitle>
            <CardDescription>{deployment.id}</CardDescription>
          </div>

          <Badge variant={priorityBadgeVariant[deployment.priority]}>{deployment.priority}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {deploymentInfo.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="font-medium">{value}</span>
          </div>
        ))}

        <Separator />

        {metadata.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="font-medium">{value}</span>
          </div>
        ))}
      </CardContent>

      {nextStatus && (
        <CardFooter>
          <Button className="w-full">Advance to {nextStatus}</Button>
        </CardFooter>
      )}
    </Card>
  )
}

export default DeploymentCard
