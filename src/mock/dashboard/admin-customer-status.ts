import {
  adminCustomerStatusMetrics,
} from './customer-metrics'
import {
  formatCustomerCount,
  formatCustomerPercentage,
} from '../../utils/dashboard-formatters'

export const adminCustomerStatus = [
  {
    title: 'Total Pelanggan',
    value: formatCustomerCount(adminCustomerStatusMetrics.total),
    caption: 'Seluruh pelanggan'
  },
  {
    title: 'Aktif',
    value: formatCustomerCount(adminCustomerStatusMetrics.active),
    caption: `${formatCustomerPercentage(adminCustomerStatusMetrics.active, adminCustomerStatusMetrics.total)}% dari total`
  },
  {
    title: 'Isolir',
    value: formatCustomerCount(adminCustomerStatusMetrics.isolated),
    caption: `${formatCustomerPercentage(adminCustomerStatusMetrics.isolated, adminCustomerStatusMetrics.total)}% perlu tindak lanjut`
  },
  {
    title: 'Non-Aktif',
    value: formatCustomerCount(adminCustomerStatusMetrics.inactive),
    caption: `${formatCustomerPercentage(adminCustomerStatusMetrics.inactive, adminCustomerStatusMetrics.total)}% dari total`
  }
]
