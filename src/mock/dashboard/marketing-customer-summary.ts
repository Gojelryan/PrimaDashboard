import {
  customerMetrics,
} from './customer-metrics'
import {
  formatCustomerCount,
  formatCustomerCurrency,
} from '../../utils/dashboard-formatters'

export const corporateCustomerSummary = {
  title: 'Corporate',
  total: formatCustomerCount(customerMetrics.corporate.total),
  newCustomer: formatCustomerCount(customerMetrics.corporate.movement.newCustomer),
  churnCustomer: formatCustomerCount(customerMetrics.corporate.movement.churnCustomer),
  periodLabel: customerMetrics.corporate.movement.periodLabel,
  outstanding: formatCustomerCurrency(customerMetrics.corporate.outstanding)
}

export const retailCustomerSummary = {
  title: 'Retail',
  total: formatCustomerCount(customerMetrics.retail.total),
  newCustomerLabel: 'Pelanggan Baru Bulan Ini',
  newCustomer: formatCustomerCount(customerMetrics.retail.movement.newCustomer),
  churnCustomerLabel: 'Pelanggan Putus Bulan Ini',
  churnCustomer: formatCustomerCount(customerMetrics.retail.movement.churnCustomer),
  periodLabel: customerMetrics.retail.movement.periodLabel,
  outstanding: formatCustomerCurrency(customerMetrics.retail.outstanding)
}
