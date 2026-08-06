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
    newCustomer: formatCustomerCount(customerMetrics.corporate.movement.newCustomer),
    churnCustomer: formatCustomerCount(customerMetrics.corporate.movement.churnCustomer),
    periodLabel: customerMetrics.corporate.movement.periodLabel,
    outstanding: formatCustomerCurrency(customerMetrics.corporate.outstanding)
  },
  {
    title: 'Retail',
    total: formatCustomerCount(adminCustomerSegmentMetrics.retail),
    newCustomer: formatCustomerCount(customerMetrics.retail.movement.newCustomer),
    churnCustomer: formatCustomerCount(customerMetrics.retail.movement.churnCustomer),
    periodLabel: customerMetrics.retail.movement.periodLabel,
    outstanding: formatCustomerCurrency(customerMetrics.retail.outstanding)
  },
  {
    title: 'Analog',
    total: formatCustomerCount(adminCustomerSegmentMetrics.analog),
    newCustomer: formatCustomerCount(customerMetrics.analog.movement.newCustomer),
    churnCustomer: formatCustomerCount(customerMetrics.analog.movement.churnCustomer),
    periodLabel: customerMetrics.analog.movement.periodLabel,
    outstanding: formatCustomerCurrency(customerMetrics.analog.outstanding)
  },
  {
    title: 'Mitra',
    total: formatCustomerCount(adminCustomerSegmentMetrics.partner),
    newCustomer: formatCustomerCount(customerMetrics.partner.movement.newCustomer),
    churnCustomer: formatCustomerCount(customerMetrics.partner.movement.churnCustomer),
    periodLabel: customerMetrics.partner.movement.periodLabel,
    outstanding: formatCustomerCurrency(customerMetrics.partner.outstanding)
  }
]
