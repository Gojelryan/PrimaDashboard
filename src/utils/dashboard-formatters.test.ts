import { describe, expect, it } from 'vitest'

import {
  formatCompactCurrency,
  formatCompactNumber,
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatRatioPercentage,
  formatUnit,
} from './dashboard-formatters'

describe('dashboard formatters', () => {
  it('formats numbers consistently with the Indonesian locale', () => {
    expect(formatNumber(1_234_567)).toBe('1.234.567')
    expect(formatNumber(1_234_567.89, 1)).toBe('1.234.567,9')
  })

  it('uses consistent compact units', () => {
    expect(formatCompactNumber(1_500_000_000)).toBe('1,5 M')
    expect(formatCompactNumber(25_000_000)).toBe('25 Jt')
    expect(formatCompactCurrency(1_500_000_000)).toBe('Rp 1,5 M')
  })

  it('formats currency, percentage, ratio, and units', () => {
    expect(formatCurrency(750_000)).toBe('Rp 750.000')
    expect(formatPercentage(42.25)).toBe('42,3%')
    expect(formatRatioPercentage(1, 4)).toBe('25%')
    expect(formatUnit(1_250, 'meter')).toBe('1.250 meter')
  })
})
