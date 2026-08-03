const customerCountFormatter = new Intl.NumberFormat('id-ID')

export const customerMetrics = {
  corporate: {
    total: 620,
    newCustomer: 25,
    churnCustomer: 8,
    outstanding: 2_060_000_000
  },
  retail: {
    total: 2732,
    newCustomer: 95,
    churnCustomer: 15,
    outstanding: 27_000_000
  }
} as const

export const adminCustomerSegmentMetrics = {
  corporate: customerMetrics.corporate.total,
  retail: customerMetrics.retail.total,
  analog: 420,
  partner: 480
} as const

const adminCustomerTotal = Object.values(adminCustomerSegmentMetrics)
  .reduce((total, value) => total + value, 0)
const isolatedCustomerTotal = 100
const inactiveCustomerTotal = 90

export const adminCustomerStatusMetrics = {
  total: adminCustomerTotal,
  active: adminCustomerTotal - isolatedCustomerTotal - inactiveCustomerTotal,
  isolated: isolatedCustomerTotal,
  inactive: inactiveCustomerTotal
} as const

export const sharedCustomersByService = [
  {
    label: 'Internet Corporate',
    value: formatCustomerCount(customerMetrics.corporate.total)
  },
  {
    label: 'Internet Retail',
    value: formatCustomerCount(customerMetrics.retail.total)
  },
  {
    label: 'Metro E',
    value: '185'
  },
  {
    label: 'Managed Service',
    value: '96'
  }
]

export function formatCustomerCount(value: number) {
  return customerCountFormatter.format(value)
}

export function formatCustomerCurrency(value: number) {
  return `Rp ${new Intl.NumberFormat('id-ID').format(value)}`
}

export function formatCustomerCurrencyCompact(value: number) {
  if (value >= 1_000_000_000) {
    return `Rp ${new Intl.NumberFormat('id-ID', {
      maximumFractionDigits: 2
    }).format(value / 1_000_000_000)} M`
  }

  if (value >= 1_000_000) {
    return `Rp ${new Intl.NumberFormat('id-ID', {
      maximumFractionDigits: 2
    }).format(value / 1_000_000)} Jt`
  }

  return formatCustomerCurrency(value)
}

export function formatCustomerPercentage(value: number, total: number) {
  return new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 1
  }).format((value / total) * 100)
}
