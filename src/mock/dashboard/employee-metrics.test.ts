import { describe, expect, it } from 'vitest'

import { employeeMetrics } from './employee-metrics'
import { summaryCards } from './summary-cards'
import { technicalOperationsDashboard } from './technical-operations-dashboard'

const expectedDivisionTotals = [
  { label: 'Teknis', total: 52 },
  { label: 'Market', total: 7 },
  { label: 'Admin', total: 8 },
  { label: 'Finance', total: 8 },
  { label: 'NOC', total: 15 },
  { label: 'IT', total: 5 },
  { label: 'Gudang', total: 10 },
  { label: 'Umum', total: 11 },
]

describe('employee metrics shared totals', () => {
  it('uses the Human Resource division distribution as the source of truth', () => {
    expect(employeeMetrics.total).toBe(116)
    expect(employeeMetrics.divisions).toEqual(
      expectedDivisionTotals.map(expected =>
        expect.objectContaining(expected)
      )
    )
    expect(
      employeeMetrics.divisions.reduce((total, division) => total + division.total, 0)
    ).toBe(employeeMetrics.total)
  })

  it('keeps Director and Technician team totals synchronized', () => {
    const technician = technicalOperationsDashboard.technician
    const directorEmployeeCard = summaryCards.find(
      card => card.title === 'Total Karyawan'
    )

    expect(directorEmployeeCard?.value).toBe('116')
    expect(technician.team.total).toBe(52)
    expect(technician.team.onsite + technician.team.standby).toBe(52)
    expect(technician.teamPerformance).toHaveLength(52)
    expect(technician.teamPerformance.every(member =>
      Number.isFinite(member.dailyInstallation) &&
      Number.isFinite(member.foWithdrawalMeters)
    )).toBe(true)
  })

})
