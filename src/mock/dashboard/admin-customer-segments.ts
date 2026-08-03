import {
  adminCustomerSegmentMetrics,
  customerMetrics,
  formatCustomerCount,
  formatCustomerCurrency,
} from './customer-metrics'

export const adminCustomerSegments = [
  {
    title: 'Corporate',
    total: formatCustomerCount(adminCustomerSegmentMetrics.corporate),
    newCustomer: formatCustomerCount(customerMetrics.corporate.newCustomer),
    churnCustomer: formatCustomerCount(customerMetrics.corporate.churnCustomer),
    outstanding: formatCustomerCurrency(customerMetrics.corporate.outstanding)
  },
  {
    title: 'Retail',
    total: formatCustomerCount(adminCustomerSegmentMetrics.retail),
    newCustomer: '142',
    churnCustomer: '37',
    outstanding: 'Rp 214,8 jt'
  },
  {
    title: 'Analog',
    total: formatCustomerCount(adminCustomerSegmentMetrics.analog),
    newCustomer: '24',
    churnCustomer: '9',
    outstanding: 'Rp 42,1 jt'
  },
  {
    title: 'Mitra',
    total: formatCustomerCount(adminCustomerSegmentMetrics.partner),
    newCustomer: '31',
    churnCustomer: '12',
    outstanding: 'Rp 36,7 jt'
  }
]
