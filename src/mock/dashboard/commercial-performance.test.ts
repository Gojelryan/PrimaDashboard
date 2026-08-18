import { describe, expect, it } from 'vitest'

import {
  commercialProjects,
  marketingCorporateCustomers,
  marketingTeamMembers,
  marketingTeamPerformance,
  totalCommercialProjectValue,
} from './commercial-performance'
import { customerMetrics } from './customer-metrics'
import { marketingEmployeeDetails } from './employee-metrics'

describe('commercial performance reconciliation', () => {
  it('uses the HR Market roster as the marketing team source', () => {
    expect(marketingTeamMembers).toHaveLength(marketingEmployeeDetails.length)
    expect(marketingTeamMembers.map(member => member.id))
      .toEqual(marketingEmployeeDetails.map(employee => employee.id))
    expect(marketingTeamMembers.map(member => member.name))
      .toEqual(marketingEmployeeDetails.map(employee => employee.employee))
  })

  it('reconciles Retail and Corporate achievements with customer movements', () => {
    expect(marketingTeamPerformance.retailCustomerTotal)
      .toBe(customerMetrics.retail.movement.newCustomer)
    expect(marketingTeamPerformance.corporateCustomerTotal)
      .toBe(customerMetrics.corporate.movement.newCustomer)
    expect(marketingCorporateCustomers)
      .toHaveLength(customerMetrics.corporate.movement.newCustomer)
    expect(marketingCorporateCustomers.every(customer => customer.contractValue > 0))
      .toBe(true)
  })

  it('derives project ownership and contract value from one portfolio', () => {
    expect(marketingTeamPerformance.projectTotal).toBe(commercialProjects.length)
    expect(
      marketingTeamMembers.reduce((total, member) => total + member.project, 0)
    ).toBe(commercialProjects.length)
    expect(totalCommercialProjectValue).toBe(
      commercialProjects.reduce((total, project) => total + project.contractValue, 0)
    )
  })
})
