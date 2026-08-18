import { corporateCustomerDetails } from './customer-detail-data'
import {
  customerMetrics,
  customerReportingPeriod,
} from './customer-metrics'
import { marketingEmployeeDetails } from './employee-metrics'

const achievementAllocations = [
  { area: 'Makassar', retailCustomer: 38, corporateCustomer: 4 },
  { area: 'Bone', retailCustomer: 35, corporateCustomer: 3 },
  { area: 'Gowa', retailCustomer: 33, corporateCustomer: 3 },
  { area: 'Maros', retailCustomer: 31, corporateCustomer: 2 },
  { area: 'Bulukumba', retailCustomer: 29, corporateCustomer: 2 },
  { area: 'Sinjai', retailCustomer: 24, corporateCustomer: 2 },
  { area: 'Sidrap', retailCustomer: 20, corporateCustomer: 1 },
] as const

const corporateContractValues = [
  1_200_000_000,
  960_000_000,
  840_000_000,
  720_000_000,
  1_080_000_000,
  900_000_000,
  780_000_000,
  1_320_000_000,
  1_140_000_000,
  870_000_000,
  750_000_000,
  690_000_000,
  1_260_000_000,
  810_000_000,
  930_000_000,
  660_000_000,
  1_020_000_000,
] as const

function getMarketingEmployee(index: number) {
  const employee = marketingEmployeeDetails[index]

  if (!employee) {
    throw new Error(`Roster HR tidak memiliki karyawan Market pada indeks ${index}.`)
  }

  return employee
}

export const commercialProjects = [
  {
    id: 'PRJ-2601',
    name: 'Pembangunan FO Gowa - Takalar',
    customer: 'PT Lintas Sulawesi Infrastruktur',
    employeeId: getMarketingEmployee(0).id,
    contractValue: 4_800_000_000,
    progressPercent: 40,
    billingStatus: 'Termin 1',
  },
  {
    id: 'PRJ-2602',
    name: 'Instalasi Jaringan Aktif - Kampus UNM Makassar',
    customer: 'Universitas Negeri Makassar',
    employeeId: getMarketingEmployee(1).id,
    contractValue: 2_400_000_000,
    progressPercent: 70,
    billingStatus: 'Termin 2',
  },
  {
    id: 'PRJ-2603',
    name: 'Pembangunan FO Kabupaten Wajo',
    customer: 'Diskominfo Kabupaten Wajo',
    employeeId: getMarketingEmployee(2).id,
    contractValue: 3_600_000_000,
    progressPercent: 30,
    billingStatus: 'Termin 1',
  },
  {
    id: 'PRJ-2604',
    name: 'Pembangunan FO Kawasan Perumahan ABCD',
    customer: 'PT Graha Celebes Mandiri',
    employeeId: getMarketingEmployee(3).id,
    contractValue: 1_850_000_000,
    progressPercent: 80,
    billingStatus: 'Termin 3',
  },
  {
    id: 'PRJ-2605',
    name: 'Instalasi 30 Titik CCTV Pemda Bulukumba',
    customer: 'Pemda Bulukumba',
    employeeId: getMarketingEmployee(4).id,
    contractValue: 1_200_000_000,
    progressPercent: 50,
    billingStatus: 'Termin 1',
  },
] as const

const newCorporateCustomers = corporateCustomerDetails
  .filter(customer => customer.periodStatus === customerReportingPeriod.ytdLabel)

let corporateCustomerIndex = 0

export const marketingCorporateCustomers = marketingEmployeeDetails.flatMap(
  (employee, employeeIndex) => {
    const allocation = achievementAllocations[employeeIndex]
    if (!allocation) return []

    const employeeCustomers = newCorporateCustomers.slice(
      corporateCustomerIndex,
      corporateCustomerIndex + allocation.corporateCustomer
    )
    corporateCustomerIndex += allocation.corporateCustomer

    return employeeCustomers.map((customer, customerIndex) => ({
      ...customer,
      employeeId: employee.id,
      contractValue: corporateContractValues[
        corporateCustomerIndex - allocation.corporateCustomer + customerIndex
      ] ?? 0,
    }))
  }
)

export const marketingTeamMembers = marketingEmployeeDetails.map(
  (employee, employeeIndex) => {
    const allocation = achievementAllocations[employeeIndex]

    return {
      id: employee.id,
      name: employee.employee,
      position: employee.position,
      area: allocation?.area ?? 'Belum ditentukan',
      retailCustomer: allocation?.retailCustomer ?? 0,
      corporateCustomer: marketingCorporateCustomers.filter(
        customer => customer.employeeId === employee.id
      ).length,
      project: commercialProjects.filter(
        project => project.employeeId === employee.id
      ).length,
    }
  }
)

const retailCustomerTotal = marketingTeamMembers.reduce(
  (total, member) => total + member.retailCustomer,
  0
)
const corporateCustomerTotal = marketingTeamMembers.reduce(
  (total, member) => total + member.corporateCustomer,
  0
)

export const totalCommercialProjectValue = commercialProjects.reduce(
  (total, project) => total + project.contractValue,
  0
)

export const marketingTeamPerformance = {
  periodLabel: `Per ${customerReportingPeriod.label}`,
  retailPeriodLabel: customerMetrics.retail.movement.periodLabel,
  corporatePeriodLabel: customerMetrics.corporate.movement.periodLabel,
  totalMember: marketingTeamMembers.length,
  retailCustomerTotal,
  corporateCustomerTotal,
  projectTotal: commercialProjects.length,
  expectedRetailCustomerTotal: customerMetrics.retail.movement.newCustomer,
  expectedCorporateCustomerTotal: customerMetrics.corporate.movement.newCustomer,
  members: marketingTeamMembers,
} as const

export function getMarketingCorporateCustomers(employeeId: string) {
  return marketingCorporateCustomers.filter(
    customer => customer.employeeId === employeeId
  )
}
