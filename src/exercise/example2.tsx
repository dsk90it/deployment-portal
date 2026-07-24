/**
 * ============================================================================
 * Exercise 2 - useDeploymentFilters
 * ============================================================================
 *
 * Scenario
 * --------
 *
 * The Release Engineering team would like to make the Deployment Queue easier
 * to navigate as the number of deployments continues to grow.
 *
 * Your task is to implement a reusable custom hook that manages searching
 * and filtering deployment data.
 *
 * ============================================================================
 *
 * Create a custom hook named:
 *
 *      useDeploymentFilters
 *
 * ============================================================================
 *
 * The hook should accept an array of deployments.
 *
 * Example
 *
 * const {
 *   search,
 *   setSearch,
 *   filteredDeployments
 * } = useDeploymentFilters(deployments);
 *
 * ============================================================================
 *
 * Functional Requirements
 *
 * The hook should:
 *
 * ✓ Maintain the search text
 *
 * ✓ Return a filtered list of deployments
 *
 * ✓ Filter by Application Name
 *
 * ✓ Filtering should be case-insensitive
 *
 * ============================================================================
 *
 * Technical Expectations
 *
 * • Use React Hooks
 *
 * • Use TypeScript
 *
 * • Keep the hook reusable
 *
 *
 * • Prefer performant solutions where appropriate
 *
 * ============================================================================
 *
 * Notes
 *
 * • Do not modify the supplied deployment data.
 *
 * • This hook will be reused in the next exercise.
 *
 * • Additional filtering requirements may be introduced later.
 *
 * ============================================================================
 *
 * Evaluation
 *
 * ✓ Custom Hooks
 * ✓ TypeScript
 * ✓ React Fundamentals
 * ✓ Code Quality
 * ✓ Reusability
 * ✓ Performance
 *
 * ============================================================================
 */
import { useMemo, useState } from 'react'
import type { DeploymentStatus } from '@/types'
import { data } from '@/data/MOCK_DATA'
import DeploymentCard from './example1'
import { Input } from '@/components/ui/input'

// eslint-disable-next-line react-refresh/only-export-components
export function useDeploymentFilters<
  T extends {
    application: string
    status: DeploymentStatus
  },
>(deployments: T[]) {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<DeploymentStatus | 'All'>('All')

  const filteredDeployments = useMemo(() => {
    return deployments.filter((deployment) => {
      const matchesSearch = deployment.application.toLowerCase().includes(search.trim().toLowerCase())
      const matchesStatus = status === 'All' || deployment.status === status
      return matchesSearch && matchesStatus
    })
  }, [deployments, search, status])

  return {
    search,
    setSearch,
    status,
    setStatus,
    filteredDeployments,
  }
}

const SearchPlaceholder = () => {
  // This is a placeholder component to demonstrate the usage of the useDeploymentFilters hook.
  //where you can use the hook and display the filtered deployments based on the search input.
  //use sadcn components for input and list rendering.

  const { search, setSearch, filteredDeployments } = useDeploymentFilters(data)
  const hasDeployments = filteredDeployments.length > 0

  return (
    <>
      <div className="mb-6 flex items-center flex-wrap justify-between gap-4">
        <h1 className="text-3xl font-bold">Deployment Queue</h1>
      </div>

      <div className="mb-4 flex items-center flex-wrap justify-between gap-4">
        <Input
          type="text"
          placeholder="Search deployment by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {hasDeployments ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDeployments.map((deployment) => (
            <DeploymentCard key={deployment.id} deployment={deployment} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No deployments found.</p>
      )}
    </>
  )
}

export default SearchPlaceholder
