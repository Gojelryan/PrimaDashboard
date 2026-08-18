import {
  totalCustomerCount
} from './customer-metrics'
import {
  formatCustomerCount,
  formatCustomerPercentage,
} from '../../utils/dashboard-formatters'

const cashCustomerTotal = Math.round(totalCustomerCount * 0.34)
const nonCashCustomerTotal = totalCustomerCount - cashCustomerTotal

export const adminPaymentCustomers = {
  title: 'Payment Customer',
  items: [
    {
      label: 'Tunai',
      value: formatCustomerCount(cashCustomerTotal),
      percentage: `${formatCustomerPercentage(cashCustomerTotal, totalCustomerCount)}%`
    },
    {
      label: 'Non-Tunai',
      value: formatCustomerCount(nonCashCustomerTotal),
      percentage: `${formatCustomerPercentage(nonCashCustomerTotal, totalCustomerCount)}%`
    }
  ]
}
