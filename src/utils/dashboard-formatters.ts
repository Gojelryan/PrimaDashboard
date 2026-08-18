const locale = 'id-ID'

const integerFormatter = new Intl.NumberFormat(locale, {
  maximumFractionDigits: 0,
})

export function formatNumber(
  value: number,
  maximumFractionDigits = 0
) {
  if (maximumFractionDigits === 0) {
    return integerFormatter.format(value)
  }

  return new Intl.NumberFormat(locale, {
    maximumFractionDigits,
  }).format(value)
}

export function formatCurrency(value: number) {
  return `Rp ${formatNumber(value)}`
}

export function formatCompactNumber(value: number) {
  const absoluteValue = Math.abs(value)

  if (absoluteValue >= 1_000_000_000) {
    return `${formatNumber(value / 1_000_000_000, 1)} M`
  }

  if (absoluteValue >= 1_000_000) {
    return `${formatNumber(value / 1_000_000, 1)} Jt`
  }

  if (absoluteValue >= 1_000) {
    return `${formatNumber(value / 1_000, 1)} Rb`
  }

  return formatNumber(value)
}

export function formatCompactCurrency(value: number) {
  return `Rp ${formatCompactNumber(value)}`
}

export function formatPercentage(value: number, maximumFractionDigits = 1) {
  return `${formatNumber(value, maximumFractionDigits)}%`
}

export function formatRatioPercentage(value: number, total: number) {
  return total === 0 ? '0%' : formatPercentage((value / total) * 100)
}

export function formatUnit(value: number, unit: string) {
  return `${formatNumber(value)} ${unit}`
}

export function formatCustomerCount(value: number) {
  return formatNumber(value)
}

export function formatEmployeeCount(value: number) {
  return formatNumber(value)
}

export function formatCustomerCurrency(value: number) {
  return formatCurrency(value)
}

export function formatCustomerCurrencyCompact(value: number) {
  return formatCompactCurrency(value)
}

export function formatCustomerPercentage(value: number, total: number) {
  return total === 0
    ? '0'
    : formatNumber((value / total) * 100, 1)
}

export function formatFinancialCurrency(value: number) {
  return formatCurrency(value)
}

export function formatFinancialCurrencyCompact(value: number) {
  return formatCompactCurrency(value)
}
