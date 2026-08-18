import {
  Users,
  BriefcaseBusiness,
  Ticket,
  Building2,
  ShoppingCart,
} from 'lucide-vue-next'
import {
  customerMetrics,
} from './customer-metrics'
import {
  employeeMetrics,
  getEmployeeAttendanceTotal,
} from './employee-metrics'
import {
  formatCustomerCount,
  formatCustomerCurrencyCompact,
  formatEmployeeCount,
} from '../../utils/dashboard-formatters'

const unavailableEmployeeTotal = employeeMetrics.total
  - getEmployeeAttendanceTotal('Hadir')
  - getEmployeeAttendanceTotal('Terlambat')

export const summaryCards = [
  {
    title: 'Total Karyawan',
    value: formatEmployeeCount(employeeMetrics.total),
    icon: Users,
    iconBg: 'bg-[var(--uui-brand-100)]',
    iconColor: 'text-[var(--uui-brand-600)]',
    borderColor: 'border-[var(--uui-brand-600)]',
    items: [
      { label: 'Hadir', value: formatEmployeeCount(getEmployeeAttendanceTotal('Hadir')) },
      { label: 'Terlambat', value: formatEmployeeCount(getEmployeeAttendanceTotal('Terlambat')) },
      { label: 'Cuti/Sakit/Absen', value: formatEmployeeCount(unavailableEmployeeTotal) },
    ],
  },

  {
    title: 'Total Pekerjaan',
    value: '124',
    icon: BriefcaseBusiness,
    iconBg: 'bg-[var(--uui-warning-50)]',
    iconColor: 'text-[var(--uui-warning-600)]',
    borderColor: 'border-[var(--uui-warning-600)]',
    items: [
      { label: 'Selesai', value: '80' },
      { label: 'On Progress', value: '35' },
      { label: 'Tunda', value: '9' },
    ],
  },

  {
    title: 'Total Ticket',
    value: '42',
    icon: Ticket,
    iconBg: 'bg-[var(--uui-error-50)]',
    iconColor: 'text-[var(--uui-error-600)]',
    borderColor: 'border-[var(--uui-error-600)]',
    items: [
      { label: 'Closing', value: '20' },
      { label: 'On Progress', value: '18' },
      { label: 'Hold', value: '4' },
    ],
  },

  {
    title: 'Corporate',
    value: formatCustomerCount(customerMetrics.corporate.total),
    icon: Building2,
    iconBg: 'bg-[var(--uui-blue-50)]',
    iconColor: 'text-[var(--uui-blue-600)]',
    borderColor: 'border-[var(--uui-blue-600)]',
    items: [
      { label: 'Pelanggan Baru', value: formatCustomerCount(customerMetrics.corporate.movement.newCustomer) },
      { label: 'Pelanggan Putus', value: formatCustomerCount(customerMetrics.corporate.movement.churnCustomer) },
      { label: 'Outstanding', value: formatCustomerCurrencyCompact(customerMetrics.corporate.outstanding) },
    ],
  },

  {
    title: 'Retail',
    value: formatCustomerCount(customerMetrics.retail.total),
    icon: ShoppingCart,
    iconBg: 'bg-[var(--uui-success-50)]',
    iconColor: 'text-[var(--uui-success-600)]',
    borderColor: 'border-[var(--uui-success-600)]',
    items: [
      { label: 'Pelanggan Baru', value: formatCustomerCount(customerMetrics.retail.movement.newCustomer) },
      { label: 'Pelanggan Putus', value: formatCustomerCount(customerMetrics.retail.movement.churnCustomer) },
      { label: 'Outstanding', value: formatCustomerCurrencyCompact(customerMetrics.retail.outstanding) },
    ],
  },
  
]
