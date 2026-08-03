import {
  customerMetrics,
  formatCustomerCount,
} from './customer-metrics'

const retailTarget = 2900

export const targetCorporatePerformance = {
  title: 'Target Corporate',
  target: 'Rp 15.000.000.000',
  currentLabel: 'Total saat ini',
  current: 'Rp 12.000.000.000',
  progress: 70
}

export const targetRetailPerformance = {
  title: 'Target Retail',
  target: `${formatCustomerCount(retailTarget)} Home Connect`,
  currentLabel: 'Total saat ini',
  current: `${formatCustomerCount(customerMetrics.retail.total)} Home Connect`,
  progress: Math.round((customerMetrics.retail.total / retailTarget) * 100)
}
