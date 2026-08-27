/**
 * ============================================================================
 * Exercise 3 - Deployment Queue
 * ============================================================================
 *
 * Scenario
 * --------
 *
 * Congratulations!
 *
 * The DeploymentCard component and search functionality have been completed.
 *
 * Your next task is to build the Deployment Queue page by integrating the
 * previous exercises.
 *
 * ============================================================================
 *
 * Requirements
 *
 * Build a Deployment Queue page using the supplied mock API response.
 *
 * The page should display all deployments using the DeploymentCard component
 * created in Exercise 1.
 *
 * Use the custom hook created in Exercise 2 for searching deployments.
 *
 * ============================================================================
 *
 * Functional Requirements
 *
 * 1. Fetch deployments using React Query.
 *
 * 2. Display all deployments.
 *
 * 3. Search deployments by Application Name.
 *
 * 4. Display the following summary:
 *
 *      Total Deployments
 *
 * 5. Add a Status filter.
 *
 *      All
 *      Pending
 *      In Progress
 *      Completed
 *      Failed
 *
 * 6. Display an Empty State when no deployments match the search/filter.
 *
 * 7. Display a Loading State while data is loading.
 *
 * 8. Display an Error State when the request fails.
 *
 * ============================================================================
 *
 * Technical Expectations
 *
 * • React Query
 *
 * • TypeScript
 *
 * • Reusable Components
 *
 * • Clean Folder Structure
 *
 * • Avoid duplicated logic
 *
 * • Use the custom hook from Exercise 2
 *
 * ============================================================================
 *
 * Bonus (Optional)
 *
 * If time permits, implement one or more of the following:
 *
 * • Sort deployments by Scheduled Date
 *
 * • Display deployment counts grouped by Status
 *
 * • Display the number of filtered deployments
 *
 * • Highlight the matched search text
 *
 * ============================================================================
 *
 * Notes
 *
 * • You may create additional components if needed.
 *
 * • You may extend the custom hook created in Exercise 2.
 *
 * • Focus on clean architecture over visual appearance.
 *
 * ============================================================================
 *
 * Evaluation
 *
 * ✓ React
 * ✓ React Query
 * ✓ TypeScript
 * ✓ Component Composition
 * ✓ Hooks
 * ✓ State Management
 * ✓ Code Organization
 * ✓ Reusability
 * ✓ Tailwind CSS
 *
 * ============================================================================
 */

import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { Deployment, DeploymentStatus } from '@/types'
import { getDeployments } from '@/api/diploymentApi'
import { useDeploymentFilters } from './example2'
import DeploymentCard from './example1'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { nextStatusMap } from '@/lib/utils'

/**
 * TODO
 *
 * Build the Deployment Queue page.
 *
 * Expected flow:
 *
 * React Query
 *        ↓
 * Deployment Data
 *        ↓
 * useDeploymentSearch()
 *        ↓
 * DeploymentCard[]
 */

export default function Example3() {
  const queryClient = useQueryClient()
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['deployments'],
    queryFn: getDeployments,
  })

  const { search, setSearch, status, setStatus, filteredDeployments } = useDeploymentFilters(data)
  const hasDeployments = filteredDeployments.length > 0
  const statuses: Array<DeploymentStatus | 'All'> = ['All', 'Pending', 'In Progress', 'Completed', 'Failed']

  const handleAdvance = (deploymentId: string) => {
    queryClient.setQueryData<Deployment[]>(['deployments'], (currentDeployments = []) =>
      currentDeployments.map((deployment) => {
        if (deployment.id !== deploymentId) {
          return deployment
        }

        const nextStatus = nextStatusMap[deployment.status]
        return nextStatus ? { ...deployment, status: nextStatus } : deployment
      }),
    )
  }

  if (isLoading) {
    return <p>Loading deployments...</p>
  }

  if (isError) {
    return <p>Something went wrong.</p>
  }

  return (
    <>
      <div className="mb-6 flex items-center flex-wrap justify-between gap-4">
        <h1 className="text-3xl font-bold">Deployment Queue</h1>
        <p className="text-muted-foreground">
          Showing {filteredDeployments.length} of {data.length} deployments
        </p>
      </div>

      <div className="mb-4 flex flex-col md:flex-row items-center md:justify-between gap-4">
        <Input
          type="text"
          placeholder="Search deployment by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="w-full md:w-48 md:shrink-0">
          <Select className="w-full" value={status} onChange={(key) => setStatus(key as DeploymentStatus | 'All')}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="p-2">
              {statuses.map((status) => (
                <SelectItem key={status} id={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasDeployments ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDeployments.map((deployment) => (
            <DeploymentCard key={deployment.id} deployment={deployment} onClickAdvance={handleAdvance} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No deployments found.</p>
      )}
    </>
  )
}
