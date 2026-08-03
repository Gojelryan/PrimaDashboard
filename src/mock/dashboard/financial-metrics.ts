import type {
  DashboardPeriod,
  FinancialMovementData,
  FinancialMonthlyPoint,
} from '../../types/dashboard'

const financialMonthlyHistory: FinancialMonthlyPoint[] = [
  {
    month: 'Jan',
    label: 'Januari 2026',
    income: 2_200_000_000,
    expense: 1_800_000_000
  },
  {
    month: 'Feb',
    label: 'Februari 2026',
    income: 2_500_000_000,
    expense: 2_100_000_000
  },
  {
    month: 'Mar',
    label: 'Maret 2026',
    income: 2_800_000_000,
    expense: 2_200_000_000
  },
  {
    month: 'Apr',
    label: 'April 2026',
    income: 2_400_000_000,
    expense: 1_900_000_000
  },
  {
    month: 'Mei',
    label: 'Mei 2026',
    income: 3_100_000_000,
    expense: 2_400_000_000
  },
  {
    month: 'Jun',
    label: 'Juni 2026',
    income: 2_900_000_000,
    expense: 2_300_000_000
  },
  {
    month: 'Jul',
    label: 'Juli 2026',
    income: 3_300_000_000,
    expense: 2_600_000_000
  }
]

export const financialReportingPeriod: DashboardPeriod = {
  year: 2026,
  month: 7,
  label: 'Juli 2026'
}

export const financialMetrics: FinancialMovementData = {
  selectedMonth: financialReportingPeriod.label ?? '',
  monthly: financialMonthlyHistory
}

export const selectedFinancialMetric = financialMetrics.monthly.find(
  item => item.label === financialMetrics.selectedMonth
) ?? financialMetrics.monthly[financialMetrics.monthly.length - 1]

export function formatFinancialCurrency(value: number) {
  return `Rp ${new Intl.NumberFormat('id-ID').format(value)}`
}

export function formatFinancialCurrencyCompact(value: number) {
  if (value >= 1_000_000_000) {
    return `Rp ${new Intl.NumberFormat('id-ID', {
      maximumFractionDigits: 1
    }).format(value / 1_000_000_000)} M`
  }

  return `Rp ${new Intl.NumberFormat('id-ID').format(value / 1_000_000)} Jt`
}
