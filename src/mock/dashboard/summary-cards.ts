import {
  Users,
  BriefcaseBusiness,
  Ticket,
  Building2,
  ShoppingCart,
} from 'lucide-vue-next'
import {
  customerMetrics,
  formatCustomerCount,
  formatCustomerCurrencyCompact,
} from './customer-metrics'
import {
  employeeMetrics,
  formatEmployeeCount,
  getEmployeeAttendanceTotal,
} from './employee-metrics'

const unavailableEmployeeTotal = employeeMetrics.total
  - getEmployeeAttendanceTotal('Hadir')
  - getEmployeeAttendanceTotal('Terlambat')

export const summaryCards = [
  {
    title: 'Total Karyawan',
    value: formatEmployeeCount(employeeMetrics.total),
    icon: Users,
    iconBg: 'bg-[#E9E7FD]',
    iconColor: 'text-[#7367F0]',
    borderColor: 'border-[#7367F0]',
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
    iconBg: 'bg-[#FFF0E1]',
    iconColor: 'text-[#FF9F43]',
    borderColor: 'border-[#FF9F43]',
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
    iconBg: 'bg-[#FCE5E6]',
    iconColor: 'text-[#EA5455]',
    borderColor: 'border-[#EA5455]',
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
    iconBg: 'bg-[#D9F7FC]',
    iconColor: 'text-[#00CFE8]',
    borderColor: 'border-[#00CFE8]',
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
    iconBg: 'bg-[#DDF6E8]',
    iconColor: 'text-[#28C76F]',
    borderColor: 'border-[#28C76F]',
    items: [
      { label: 'Pelanggan Baru', value: formatCustomerCount(customerMetrics.retail.movement.newCustomer) },
      { label: 'Pelanggan Putus', value: formatCustomerCount(customerMetrics.retail.movement.churnCustomer) },
      { label: 'Outstanding', value: formatCustomerCurrencyCompact(customerMetrics.retail.outstanding) },
    ],
  },
  
]
