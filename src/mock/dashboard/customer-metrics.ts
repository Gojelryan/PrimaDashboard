const customerCountFormatter = new Intl.NumberFormat('id-ID')

export const customerReportingPeriod = {
  year: 2026,
  month: 8,
  monthName: 'Agustus',
  label: 'Agustus 2026',
  ytdLabel: 'YTD 2026'
} as const

export const retailAcquisitionCapacity = {
  homePass: 35_000,
  targetHomeConnect: 25_000,
  emptyPort: 10_000
} as const

/**
 * Sumber kebenaran data pelanggan lintas dashboard.
 * Setiap mutasi menyertakan periode eksplisit agar angka bulanan dan YTD tidak
 * dapat tertukar saat dipakai modul lain.
 */
export const customerMetrics = {
  corporate: {
    total: 271,
    movement: {
      period: 'ytd',
      periodLabel: customerReportingPeriod.ytdLabel,
      newCustomer: 17,
      churnCustomer: 8
    },
    outstanding: 2_060_000_000
  },
  retail: {
    total: 5_625,
    movement: {
      period: 'monthly',
      periodLabel: customerReportingPeriod.label,
      newCustomer: 210,
      churnCustomer: 5
    },
    outstanding: 27_000_000
  },
  analog: {
    total: 420,
    movement: {
      period: 'monthly',
      periodLabel: 'Juli 2026',
      newCustomer: 24,
      churnCustomer: 9
    },
    outstanding: 42_100_000
  },
  partner: {
    total: 1_945,
    movement: {
      period: 'monthly',
      periodLabel: customerReportingPeriod.label,
      newCustomer: 5,
      churnCustomer: 1
    },
    outstanding: 36_700_000
  }
} as const

export type CustomerSegmentKey = keyof typeof customerMetrics

export const adminCustomerSegmentMetrics = {
  corporate: customerMetrics.corporate.total,
  retail: customerMetrics.retail.total,
  analog: customerMetrics.analog.total,
  partner: customerMetrics.partner.total
} as const

export const totalCustomerCount = Object.values(customerMetrics)
  .reduce((total, segment) => total + segment.total, 0)

export const totalCustomerOutstanding = Object.values(customerMetrics)
  .reduce((total, segment) => total + segment.outstanding, 0)

const isolatedCustomerTotal = 100
const inactiveCustomerTotal = 90

export const adminCustomerStatusMetrics = {
  total: totalCustomerCount,
  active: totalCustomerCount - isolatedCustomerTotal - inactiveCustomerTotal,
  isolated: isolatedCustomerTotal,
  inactive: inactiveCustomerTotal
} as const

/** Segment pelanggan, bukan jenis layanan tambahan yang dapat dimiliki pelanggan yang sama. */
export const sharedCustomerSegments = [
  {
    label: 'Corporate',
    value: formatCustomerCount(customerMetrics.corporate.total)
  },
  {
    label: 'Retail',
    value: formatCustomerCount(customerMetrics.retail.total)
  },
  {
    label: 'Mitra',
    value: formatCustomerCount(customerMetrics.partner.total)
  },
  {
    label: 'Analog',
    value: formatCustomerCount(customerMetrics.analog.total)
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
  if (total === 0) return '0'

  return new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 1
  }).format((value / total) * 100)
}
