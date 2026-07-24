import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { BadgeVariant, Deployment } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))

export const nextStatusMap: Record<Deployment['status'], Deployment['status'] | null> = {
  Pending: 'In Progress',
  'In Progress': 'Completed',
  Completed: null,
  Failed: null,
}

export const badgeVariantMap = {
  status: {
    Pending: 'secondary',
    'In Progress': 'default',
    Completed: 'outline',
    Failed: 'destructive',
  },

  environment: {
    Production: 'destructive',
    QA: 'secondary',
    Development: 'outline',
    Staging: 'default',
  },

  priority: {
    Low: 'outline',
    Medium: 'secondary',
    High: 'default',
    Critical: 'destructive',
  },
} satisfies {
  status: Record<Deployment['status'], BadgeVariant>
  environment: Record<Deployment['environment'], BadgeVariant>
  priority: Record<Deployment['priority'], BadgeVariant>
}
