import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Deployment } from '@/types'

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
