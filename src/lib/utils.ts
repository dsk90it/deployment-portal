import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { VariantProps } from 'class-variance-authority'
import { badgeVariants } from '@/components/ui/badge'
import type { Deployment } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type BadgeVariant = VariantProps<typeof badgeVariants>['variant']

export const nextStatusMap: Record<Deployment['status'], Deployment['status'] | null> = {
  Pending: 'In Progress',
  'In Progress': 'Completed',
  Completed: null,
}

export const badgeVariantMap: {
  status: Record<Deployment['status'], BadgeVariant>
  environment: Record<Deployment['environment'], BadgeVariant>
  priority: Record<Deployment['priority'], BadgeVariant>
} = {
  status: {
    Pending: 'secondary',
    'In Progress': 'default',
    Completed: 'outline',
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
}

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
