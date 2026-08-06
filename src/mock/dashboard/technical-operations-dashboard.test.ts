import { describe, expect, it } from 'vitest'

import { internetCapacity, popCapacity } from './internet-capacity'
import { technicalOperationsDashboard } from './technical-operations-dashboard'

describe('technical operations infrastructure capacity', () => {
  const technician = technicalOperationsDashboard.technician
  const noc = technicalOperationsDashboard.noc
  const oltTotal = technician.infrastructureAssets.find(
    asset => asset.label === 'OLT'
  )?.value
  const popTotal = technician.infrastructureAssets.find(
    asset => asset.label === 'POP'
  )?.value

  it('provides capacity data for every POP asset', () => {
    expect(oltTotal).toBe(27)
    expect(popTotal).toBe(oltTotal)
    expect(noc.popCapacity).toHaveLength(popTotal ?? 0)
    expect(noc.popCapacity).toBe(popCapacity)
    expect(noc.internetCapacity).toBe(internetCapacity)
  })

  it('derives internet capacity totals from all POP capacities', () => {
    const totals = noc.popCapacity.reduce(
      (result, pop) => ({
        totalGbps: result.totalGbps + pop.capacityGbps,
        usedGbps: result.usedGbps + pop.usedGbps,
        availableGbps: result.availableGbps + pop.availableGbps,
      }),
      { totalGbps: 0, usedGbps: 0, availableGbps: 0 }
    )

    expect(totals).toEqual(noc.internetCapacity)
    expect(totals.totalGbps).toBe(200)
    expect(totals.usedGbps).toBe(150)
    expect(totals.availableGbps).toBe(50)
  })

  it('keeps every POP utilization internally consistent', () => {
    for (const pop of noc.popCapacity) {
      expect(pop.usedGbps + pop.availableGbps).toBeCloseTo(pop.capacityGbps)
      expect(pop.utilizationPercent).toBeCloseTo(
        (pop.usedGbps / pop.capacityGbps) * 100,
        1
      )
    }
  })
})
