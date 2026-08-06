import { describe, expect, it } from 'vitest'

import { adminCustomerSegments } from './admin-customer-segments'
import { adminPaymentCustomers } from './admin-payment-customers'
import {
  adminCustomerStatusMetrics,
  customerMetrics,
  formatCustomerCurrency,
  retailAcquisitionCapacity,
  sharedCustomerSegments,
  totalCustomerCount,
  totalCustomerOutstanding
} from './customer-metrics'
import {
  corporateCustomerDetails,
  retailPackageFees,
  retailCustomerDetails
} from './customer-detail-data'
import { customerGrowth } from './customer-growth'
import { financeDashboard } from './finance-dashboard'
import {
  corporateCustomerSummary,
  retailCustomerSummary
} from './marketing-customer-summary'
import {
  targetCorporatePerformance,
  targetRetailPerformance
} from './marketing-target-performance'
import {
  partnerCustomerDetails,
  partnerDistribution,
} from './partner-distribution'
import { portStatus } from './marketing-port-status'

function parseCustomerCount(value: string) {
  return Number(value.replace(/\./g, ''))
}

describe('customer data reconciliation', () => {
  it('uses the requested segment totals as one cross-module source', () => {
    expect(customerMetrics.corporate.total).toBe(271)
    expect(customerMetrics.corporate.movement.newCustomer).toBe(17)
    expect(customerMetrics.retail.total).toBe(5_625)
    expect(customerMetrics.partner.total).toBe(1_945)
    expect(totalCustomerCount).toBe(8_261)

    expect(adminCustomerStatusMetrics.total).toBe(totalCustomerCount)
    expect(
      adminCustomerStatusMetrics.active
      + adminCustomerStatusMetrics.isolated
      + adminCustomerStatusMetrics.inactive
    ).toBe(totalCustomerCount)

    expect(sharedCustomerSegments.map(segment => segment.value)).toEqual([
      '271',
      '5.625',
      '1.945',
      '420'
    ])
  })

  it('keeps Marketing, Director, and Admin segment cards synchronized', () => {
    expect(corporateCustomerSummary.total).toBe('271')
    expect(retailCustomerSummary.total).toBe('5.625')

    const adminCorporate = adminCustomerSegments.find(segment => segment.title === 'Corporate')
    const adminRetail = adminCustomerSegments.find(segment => segment.title === 'Retail')
    const adminPartner = adminCustomerSegments.find(segment => segment.title === 'Mitra')

    expect(adminCorporate?.total).toBe(corporateCustomerSummary.total)
    expect(adminCorporate?.outstanding).toBe(corporateCustomerSummary.outstanding)
    expect(adminRetail?.total).toBe(retailCustomerSummary.total)
    expect(adminRetail?.outstanding).toBe(retailCustomerSummary.outstanding)
    expect(adminPartner?.total).toBe('1.945')
  })

  it('reconciles payment methods and partner-area distribution', () => {
    const paymentTotal = adminPaymentCustomers.items.reduce(
      (total, item) => total + parseCustomerCount(item.value),
      0
    )
    const areaCustomerTotal = partnerDistribution.areas.reduce(
      (total, area) => total + area.customer,
      0
    )
    const areaPartnerTotal = partnerDistribution.areas.reduce(
      (total, area) => total + area.partner,
      0
    )

    expect(paymentTotal).toBe(totalCustomerCount)
    expect(areaCustomerTotal).toBe(customerMetrics.partner.total)
    expect(areaCustomerTotal).toBe(partnerDistribution.totalCustomer)
    expect(areaPartnerTotal).toBe(partnerDistribution.totalPartner)
    expect(partnerDistribution.totalPartner).toBe(21)
    expect(partnerCustomerDetails).toHaveLength(21)
    expect(new Set(partnerCustomerDetails.map(partner => partner.id)).size).toBe(21)
    expect(new Set(partnerCustomerDetails.map(partner => partner.name)).size).toBe(21)
    expect(
      partnerCustomerDetails.reduce((total, partner) => total + partner.totalCustomer, 0)
    ).toBe(partnerDistribution.totalCustomer)
    expect(partnerDistribution.partners).toBe(partnerCustomerDetails)
    expect(partnerDistribution.areas).toEqual([
      { name: 'Bone', partner: 3, customer: 381 },
      { name: 'Sidrap', partner: 2, customer: 278 },
      { name: 'Bulukumba', partner: 3, customer: 273 },
      { name: 'Sinjai', partner: 2, customer: 143 },
      { name: 'Palopo', partner: 2, customer: 162 },
      { name: 'Pinrang', partner: 3, customer: 229 },
      { name: 'Maros', partner: 3, customer: 291 },
      { name: 'Takalar', partner: 3, customer: 188 }
    ])
  })

  it('uses one reporting cutoff and closes customer trends at current totals', () => {
    expect(customerGrowth.retail.categories.at(-1)).toBe('Agu')
    expect(customerGrowth.retail.series.at(-1)).toBe(customerMetrics.retail.total)
    expect(customerGrowth.partner.series.at(-1)).toBe(customerMetrics.partner.total)
    expect(customerGrowth.retail.series).toEqual([4713, 4831, 4960, 5056, 5191, 5299, 5420, 5625])
    expect(customerGrowth.partner.series).toEqual([1752, 1791, 1837, 1869, 1908, 1919, 1941, 1945])
    expect(customerGrowth.retail.newCustomers).toEqual([112, 133, 149, 106, 150, 128, 131, 210])
    expect(customerGrowth.retail.churnCustomers).toEqual([10, 15, 20, 10, 15, 20, 10, 5])
    expect(customerGrowth.partner.newCustomers).toEqual([35, 45, 55, 35, 45, 20, 25, 5])
    expect(customerGrowth.partner.churnCustomers).toEqual([3, 6, 9, 3, 6, 9, 3, 1])
    expect(customerMetrics.retail.movement).toEqual({
      period: 'monthly',
      periodLabel: 'Agustus 2026',
      newCustomer: 210,
      churnCustomer: 5
    })
    expect(customerMetrics.partner.movement).toEqual({
      period: 'monthly',
      periodLabel: 'Agustus 2026',
      newCustomer: 5,
      churnCustomer: 1
    })
    expect(targetCorporatePerformance.target).toBe('Rp 25.000.000.000')
    expect(targetCorporatePerformance.progress).toBe(48)
    expect(targetRetailPerformance.target).toBe('25.000 Home Connect')
    expect(targetRetailPerformance.progress).toBe(23)
    expect(retailAcquisitionCapacity.homePass).toBe(35_000)
    expect(portStatus.homePass).toBe(retailAcquisitionCapacity.homePass)
    expect(portStatus.emptyPort).toBe(10_000)
    expect(portStatus.progress).toBe(71)
  })

  it('keeps Finance receivables equal to all segment outstanding values', () => {
    const receivableCard = financeDashboard.summary.find(item => item.title === 'Piutang')

    expect(receivableCard?.value).toBe(formatCustomerCurrency(totalCustomerOutstanding))
    expect(totalCustomerOutstanding).toBe(2_165_800_000)
  })

  it('provides 100 deterministic, unique sample rows for each customer popup', () => {
    for (const rows of [corporateCustomerDetails, retailCustomerDetails]) {
      expect(rows).toHaveLength(100)
      expect(new Set(rows.map(row => row.id)).size).toBe(100)
      expect(rows.every(row =>
        row.customerStatus
        && row.periodStatus
        && row.billingStatus
      )).toBe(true)
    }

    expect(corporateCustomerDetails.filter(row => row.periodStatus === 'YTD 2026')).toHaveLength(17)
    expect(retailCustomerDetails.filter(row => row.periodStatus === 'Baru Agustus 2026')).toHaveLength(100)
    expect(retailCustomerDetails.filter(row => row.customerStatus === 'Putus')).toHaveLength(5)

    const packageFees = new Map(
      retailPackageFees.map(item => [
        `Retail ${item.speedMbps} Mbps`,
        formatCustomerCurrency(item.monthlyFee)
      ])
    )

    expect(retailCustomerDetails.every(row =>
      row.monthlyFee === packageFees.get(row.package)
    )).toBe(true)
  })
})
