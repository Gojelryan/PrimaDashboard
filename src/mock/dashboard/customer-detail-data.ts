import {
  customerMetrics,
  customerReportingPeriod,
} from './customer-metrics'
import { formatCustomerCurrency } from '../../utils/dashboard-formatters'

export interface CustomerDetailRow {
  id: string
  customer: string
  area: string
  package: string
  joinedAt: string
  outstanding: string
  customerStatus: string
  periodStatus: string
  billingStatus: string
  [key: string]: string
}

const areas = [
  'Makassar',
  'Gowa',
  'Maros',
  'Pangkep',
  'Bone',
  'Sidrap',
  'Parepare',
  'Palopo',
  'Pinrang',
  'Takalar'
]

const corporateNames = [
  'Nusantara Digital',
  'Sulawesi Logistik',
  'Karya Mandiri',
  'Bahari Sejahtera',
  'Cahaya Timur',
  'Mitra Industri',
  'Sentosa Medika',
  'Prima Edukasi',
  'Celebes Niaga',
  'Bumi Infrastruktur'
]

const retailFirstNames = [
  'Andi',
  'Nur',
  'Muhammad',
  'Sitti',
  'Fajar',
  'Rahmawati',
  'Irfan',
  'Yuliana',
  'Rizky',
  'Aulia'
]

const retailLastNames = [
  'Saputra',
  'Aisyah',
  'Maulana',
  'Aminah',
  'Hidayat',
  'Pratama',
  'Ramadhan',
  'Putri',
  'Akbar',
  'Lestari'
]

export const retailPackageFees = [
  { speedMbps: 200, monthlyFee: 599_000 },
  { speedMbps: 100, monthlyFee: 449_000 },
  { speedMbps: 50, monthlyFee: 299_000 },
  { speedMbps: 30, monthlyFee: 249_000 },
  { speedMbps: 20, monthlyFee: 219_000 },
  { speedMbps: 10, monthlyFee: 199_000 }
] as const

function getBillingStatus(outstanding: number, index: number) {
  if (outstanding === 0) return 'Lunas'
  return index % 5 === 0 ? 'Lewat Jatuh Tempo' : 'Belum Jatuh Tempo'
}

function getExistingJoinDate(index: number) {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
  const day = (index % 28) + 1
  const month = monthNames[index % monthNames.length]
  const year = 2021 + (index % 5)
  return `${day} ${month} ${year}`
}

function getYtdJoinDate(index: number) {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu']
  const day = (index % 28) + 1
  return `${day} ${monthNames[index % monthNames.length]} ${customerReportingPeriod.year}`
}

export const corporateCustomerDetails: CustomerDetailRow[] = Array.from(
  { length: 100 },
  (_, index) => {
    const customerNumber = customerMetrics.corporate.total - index
    const isNewYtd = index < customerMetrics.corporate.movement.newCustomer
    const outstanding = index % 4 === 0 ? 0 : (5 + ((index * 7) % 45)) * 1_000_000

    return {
      id: `COR-${String(customerNumber).padStart(4, '0')}`,
      customer: `PT ${corporateNames[index % corporateNames.length]} ${String(index + 1).padStart(3, '0')}`,
      area: areas[index % areas.length],
      package: `Corporate ${[50, 75, 100, 200, 300, 500][index % 6]} Mbps`,
      joinedAt: isNewYtd ? getYtdJoinDate(index) : getExistingJoinDate(index),
      outstanding: formatCustomerCurrency(outstanding),
      customerStatus: index >= 92 ? 'Putus' : 'Aktif',
      periodStatus: isNewYtd ? customerReportingPeriod.ytdLabel : 'Existing',
      billingStatus: getBillingStatus(outstanding, index)
    }
  }
)

export const retailCustomerDetails: CustomerDetailRow[] = Array.from(
  { length: 100 },
  (_, index) => {
    const customerNumber = customerMetrics.retail.total - index
    const isNewThisMonth = index < customerMetrics.retail.movement.newCustomer
    const outstanding = index % 3 === 0 ? 0 : (250 + ((index % 6) * 75)) * 1_000
    const selectedPackage = retailPackageFees[index % retailPackageFees.length]

    return {
      id: `RTL-${String(customerNumber).padStart(5, '0')}`,
      customer: `${retailFirstNames[index % retailFirstNames.length]} ${retailLastNames[(index * 3) % retailLastNames.length]} ${String(index + 1).padStart(3, '0')}`,
      area: areas[(index * 3) % areas.length],
      package: `Retail ${selectedPackage.speedMbps} Mbps`,
      monthlyFee: formatCustomerCurrency(selectedPackage.monthlyFee),
      joinedAt: isNewThisMonth
        ? `${(index % 28) + 1} Agu ${customerReportingPeriod.year}`
        : getExistingJoinDate(index),
      outstanding: formatCustomerCurrency(outstanding),
      customerStatus: index >= 95 ? 'Putus' : 'Aktif',
      periodStatus: isNewThisMonth ? `Baru ${customerReportingPeriod.label}` : 'Existing',
      billingStatus: getBillingStatus(outstanding, index)
    }
  }
)
