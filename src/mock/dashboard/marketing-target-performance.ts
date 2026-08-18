import {
  customerMetrics,
  retailAcquisitionCapacity,
} from './customer-metrics'
import {
  formatCustomerCount,
  formatCustomerCurrency,
} from '../../utils/dashboard-formatters'

const corporateRevenueTarget = 25_000_000_000
const corporateRevenueCurrent = 12_000_000_000
const retailTarget = retailAcquisitionCapacity.targetHomeConnect

export const targetCorporatePerformance = {
  title: 'Target Corporate',
  target: formatCustomerCurrency(corporateRevenueTarget),
  currentLabel: 'Total saat ini',
  current: formatCustomerCurrency(corporateRevenueCurrent),
  progress: Math.round((corporateRevenueCurrent / corporateRevenueTarget) * 100)
}

export const targetRetailPerformance = {
  title: 'Target Retail',
  target: `${formatCustomerCount(retailTarget)} Home Connect`,
  currentLabel: 'Total saat ini',
  current: `${formatCustomerCount(customerMetrics.retail.total)} Home Connect`,
  progress: Math.round((customerMetrics.retail.total / retailTarget) * 100)
}
