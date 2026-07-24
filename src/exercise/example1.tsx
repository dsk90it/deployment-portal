/**
 * ============================================================================
 * Exercise 1 - Deployment Card
 * ============================================================================
 *
 * Scenario
 * --------
 *
 * Your team is building an internal Deployment Queue application used by
 * Release Engineers to monitor application deployments.
 *
 * A mock API response has been provided in src/data/MOCK_DATA.ts.
 *
 * In this exercise, your task is to build a reusable DeploymentCard component.
 *
 * ============================================================================
 *
 * ## Requirements

### 1. Component Setup

- Create a `DeploymentCard` component.
- Keep the provided imports unchanged.
- Use React with TypeScript.
- Use the existing Shadcn UI components:
  - Card
  - Badge
  - Button
  - Separator

---
### 2. Deployment Interface

Create the `Deployment` interface with the mockdata properties:
make sure 
environment: "Production" | "QA" | "Development" | "Staging";
status: "Pending" | "In Progress" | "Completed";
priority: "Low" | "Medium" | "High" | "Critical";



 * ============================================================================
 *
 * UI Requirements
 *
 * • Use the provided shadcn/ui components where appropriate.
 *
 * • Environment and Status should be displayed using badges.
 *
 * • Display a "advance to [next status]" button at the bottom of the card.
 *
 * • Use appropriate spacing and visual hierarchy.
 *
 * • The component should remain responsive.
 *
 * ============================================================================
 *
 * Technical Expectations
 *
 * • Use TypeScript.
 *
 * • Define appropriate interfaces/types.
 *
 * • Keep the component reusable.
 *
 * • Do not hardcode values.
 *
 * • Avoid unnecessary duplication.
 *
 * • Write clean, maintainable code.
 *
 * ============================================================================
 *
 * Evaluation
 *
 * We will evaluate:
 *
 * ✓ React Fundamentals
 * ✓ Component Composition
 * ✓ TypeScript
 * ✓ Code Organization
 * ✓ Reusability
 * ✓ Tailwind CSS
 *
 * ============================================================================
 *
 * Note
 *
 * This exercise focuses only on the DeploymentCard component.
 *
 * Additional requirements will be introduced in later exercises.
 *
 * ============================================================================
 */
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { Deployment } from '@/types'
import { badgeVariantMap, formatDate, nextStatusMap } from '@/lib/utils'

interface DeploymentCardProps {
  deployment: Deployment
}

const DeploymentCard = ({ deployment }: DeploymentCardProps) => {
  const nextStatus = nextStatusMap[deployment.status]
  const deploymentInfo = [
    {
      label: 'Priority',
      value: <Badge variant={badgeVariantMap.priority[deployment.priority]}>{deployment.priority}</Badge>,
    },
    {
      label: 'Environment',
      value: <Badge variant={badgeVariantMap.environment[deployment.environment]}>{deployment.environment}</Badge>,
    },
    {
      label: 'Status',
      value: <Badge variant={badgeVariantMap.status[deployment.status]}>{deployment.status}</Badge>,
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
        <CardTitle className="flex flex-wrap items-center gap-1 justify-between">
          {deployment.application}
          <span className="text-sm font-normal text-muted-foreground">{deployment.id}</span>
        </CardTitle>
        <CardDescription>{deployment.version}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          {deploymentInfo.map(({ label, value }) => (
            <span title={label} className="font-medium">
              {value}
            </span>
          ))}
        </div>

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
