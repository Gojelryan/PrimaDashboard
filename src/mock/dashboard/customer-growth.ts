import { customerMetrics, customerReportingPeriod } from './customer-metrics'

interface MonthlyCustomerMovementInput {
  month: string
  newCustomer: number
  churnCustomer: number
}

function buildCustomerMovement(
  openingTotal: number,
  movements: readonly MonthlyCustomerMovementInput[]
) {
  let closingTotal = openingTotal

  return movements.map(movement => {
    const netGrowth = movement.newCustomer - movement.churnCustomer
    closingTotal += netGrowth

    return {
      ...movement,
      netGrowth,
      closingTotal
    }
  })
}

export const customerMovementHistory = {
  retail: {
    openingTotal: 4_611,
    monthly: buildCustomerMovement(4_611, [
      { month: 'Jan', newCustomer: 112, churnCustomer: 10 },
      { month: 'Feb', newCustomer: 133, churnCustomer: 15 },
      { month: 'Mar', newCustomer: 149, churnCustomer: 20 },
      { month: 'Apr', newCustomer: 106, churnCustomer: 10 },
      { month: 'Mei', newCustomer: 150, churnCustomer: 15 },
      { month: 'Jun', newCustomer: 128, churnCustomer: 20 },
      { month: 'Jul', newCustomer: 131, churnCustomer: 10 },
      { month: 'Agu', newCustomer: 210, churnCustomer: 5 }
    ])
  },
  partner: {
    openingTotal: 1_720,
    monthly: buildCustomerMovement(1_720, [
      { month: 'Jan', newCustomer: 35, churnCustomer: 3 },
      { month: 'Feb', newCustomer: 45, churnCustomer: 6 },
      { month: 'Mar', newCustomer: 55, churnCustomer: 9 },
      { month: 'Apr', newCustomer: 35, churnCustomer: 3 },
      { month: 'Mei', newCustomer: 45, churnCustomer: 6 },
      { month: 'Jun', newCustomer: 20, churnCustomer: 9 },
      { month: 'Jul', newCustomer: 25, churnCustomer: 3 },
      { month: 'Agu', newCustomer: 5, churnCustomer: 1 }
    ])
  }
} as const

export const customerGrowth = {
  periodLabel: `Januari–${customerReportingPeriod.monthName} ${customerReportingPeriod.year}`,
  corporate: {
    metric: 'revenue',
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'],
    series: [1500, 1750, 2150, 2620, 2800, 2950, 3000]
  },
  retail: {
    metric: 'customer',
    categories: customerMovementHistory.retail.monthly.map(item => item.month),
    series: customerMovementHistory.retail.monthly.map(item => item.closingTotal),
    newCustomers: customerMovementHistory.retail.monthly.map(item => item.newCustomer),
    churnCustomers: customerMovementHistory.retail.monthly.map(item => item.churnCustomer)
  },
  partner: {
    metric: 'customer',
    categories: customerMovementHistory.partner.monthly.map(item => item.month),
    series: customerMovementHistory.partner.monthly.map(item => item.closingTotal),
    newCustomers: customerMovementHistory.partner.monthly.map(item => item.newCustomer),
    churnCustomers: customerMovementHistory.partner.monthly.map(item => item.churnCustomer)
  }
} as const

if (customerGrowth.retail.series.at(-1) !== customerMetrics.retail.total) {
  throw new Error('Total akhir Retail tidak sesuai customerMetrics')
}

if (customerGrowth.partner.series.at(-1) !== customerMetrics.partner.total) {
  throw new Error('Total akhir Mitra tidak sesuai customerMetrics')
}
