import { describe, expect, it } from 'vitest'
import { render, screen, renderHook, act, fireEvent } from '@testing-library/react'

import SearchPlaceholder, { useDeploymentFilters } from './example2'
import type { DeploymentStatus } from '@/types'

const deployments: {
  id: string
  application: string
  status: DeploymentStatus
}[] = [
  {
    id: '1',
    application: 'Customer Portal',
    status: 'Pending',
  },
  {
    id: '2',
    application: 'Payments API',
    status: 'Completed',
  },
]

describe('useDeploymentFilters', () => {
  it('returns all deployments initially', () => {
    const { result } = renderHook(() => useDeploymentFilters(deployments))

    expect(result.current.filteredDeployments).toHaveLength(2)
  })

  it('filters deployments by application', () => {
    const { result } = renderHook(() => useDeploymentFilters(deployments))

    act(() => {
      result.current.setSearch('customer')
    })

    expect(result.current.filteredDeployments).toEqual([deployments[0]])
  })

  it('returns empty array when no deployment matches', () => {
    const { result } = renderHook(() => useDeploymentFilters(deployments))

    act(() => {
      result.current.setSearch('xyz')
    })

    expect(result.current.filteredDeployments).toEqual([])
  })

  it('filters deployments by status', () => {
    const { result } = renderHook(() => useDeploymentFilters(deployments))

    act(() => {
      result.current.setStatus('Completed')
    })

    expect(result.current.filteredDeployments).toEqual([deployments[1]])
  })
})

describe('SearchPlaceholder', () => {
  it('renders search input', () => {
    render(<SearchPlaceholder />)

    expect(screen.getByPlaceholderText(/search deployment/i)).toBeInTheDocument()
  })

  it('filters deployments while typing', () => {
    render(<SearchPlaceholder />)

    const input = screen.getByPlaceholderText(/search deployment/i)

    fireEvent.change(input, {
      target: {
        value: 'customer',
      },
    })

    expect(screen.getByText(/customer portal/i)).toBeInTheDocument()

    expect(screen.queryByText(/payments api/i)).not.toBeInTheDocument()
  })

  it('shows no deployments found message', () => {
    render(<SearchPlaceholder />)

    const input = screen.getByPlaceholderText(/search deployment/i)

    fireEvent.change(input, {
      target: {
        value: 'xyz',
      },
    })

    expect(screen.getByText(/no deployments found/i)).toBeInTheDocument()
  })
})
