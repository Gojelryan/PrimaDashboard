import {
  customerMetrics,
  totalCustomerCount,
} from './customer-metrics'
import { formatCustomerCount } from '../../utils/dashboard-formatters'

const segmentPresentation = [
  { key: 'corporate', label: 'Corporate', accentClass: 'bg-[var(--uui-blue-600)]' },
  { key: 'retail', label: 'Retail', accentClass: 'bg-[var(--uui-success-600)]' },
  { key: 'partner', label: 'Mitra', accentClass: 'bg-[var(--uui-brand-600)]' },
  { key: 'analog', label: 'Analog', accentClass: 'bg-[var(--uui-warning-600)]' },
] as const

export const marketingCustomerSegments = segmentPresentation.map(segment => {
  const total = customerMetrics[segment.key].total

  return {
    label: segment.label,
    value: formatCustomerCount(total),
    percentage: (total / totalCustomerCount) * 100,
    accentClass: segment.accentClass,
  }
})

export const marketingCustomerTotal = formatCustomerCount(totalCustomerCount)
