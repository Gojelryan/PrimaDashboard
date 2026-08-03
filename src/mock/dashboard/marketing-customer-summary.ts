import {
  customerMetrics,
  formatCustomerCount,
  formatCustomerCurrency,
} from './customer-metrics'

export const corporateCustomerSummary = {
  title: 'Corporate',
  total: formatCustomerCount(customerMetrics.corporate.total),
  newCustomer: formatCustomerCount(customerMetrics.corporate.newCustomer),
  churnCustomer: formatCustomerCount(customerMetrics.corporate.churnCustomer),
  outstanding: formatCustomerCurrency(customerMetrics.corporate.outstanding)
}

export const retailCustomerSummary = {
  title: 'Retail',
  total: formatCustomerCount(customerMetrics.retail.total),
  newCustomer: formatCustomerCount(customerMetrics.retail.newCustomer),
  churnCustomer: formatCustomerCount(customerMetrics.retail.churnCustomer),
  outstanding: 'Rp 27.000.000'
}
