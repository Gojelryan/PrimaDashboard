const employeeCountFormatter = new Intl.NumberFormat('id-ID')

const technicianNames = [
  'Andi Pratama Yusuf',
  'Rizal Pongoh',
  'Fadli Lahay',
  'Arsyad Palallo',
  'Budi Santoso',
  'Rahmat Hidayat',
  'Dimas Saputra'
]

const firstNames = [
  'Sitti', 'Muhammad', 'Nur', 'Ahmad', 'Dewi', 'Irfan', 'Riska', 'Fajar',
  'Yohana', 'Kevin', 'Aisyah', 'Akbar', 'Rahma', 'Ilham', 'Putri', 'Farhan',
  'Nabila', 'Reza', 'Kartika', 'Aditya'
]

const lastNames = [
  'Mambu', 'Tulenan', 'Maulana', 'Ramadhan', 'Lestari', 'Kurniawan',
  'Hasan', 'Wijaya', 'Permata', 'Nugraha', 'Ananda', 'Mahendra'
]

const divisionProfiles = [
  {
    key: 'marketing',
    label: 'Marketing',
    cardLabel: 'Div. Marketing',
    total: 21,
    positions: ['Account Executive', 'Marketing Analyst', 'Sales Support']
  },
  {
    key: 'technician',
    label: 'Teknisi',
    cardLabel: 'Div. Teknisi',
    total: 7,
    positions: ['Teknisi Senior', 'Teknisi FO', 'Teknisi Instalasi']
  },
  {
    key: 'admin',
    label: 'Admin',
    cardLabel: 'Div. Admin',
    total: 18,
    positions: ['Admin Billing', 'Admin Customer', 'Kolektor']
  },
  {
    key: 'finance',
    label: 'Finance',
    cardLabel: 'Div. Finance',
    total: 12,
    positions: ['Finance Officer', 'Accountant', 'Treasury Staff']
  },
  {
    key: 'warehouse',
    label: 'Gudang',
    cardLabel: 'Gudang',
    total: 14,
    positions: ['Koordinator Gudang', 'Inventory Staff', 'Logistic Staff']
  },
  {
    key: 'noc',
    label: 'NOC',
    cardLabel: 'NOC',
    total: 16,
    positions: ['NOC Engineer', 'Network Monitoring', 'NOC Support']
  },
  {
    key: 'it',
    label: 'IT',
    cardLabel: 'IT',
    total: 10,
    positions: ['System Administrator', 'Software Engineer', 'IT Support']
  },
  {
    key: 'general',
    label: 'Umum',
    cardLabel: 'Umum',
    total: 18,
    positions: ['General Affairs', 'Security', 'Office Support']
  }
] as const

const attendanceOverrides = new Map<number, string>([
  [3, 'Terlambat'],
  [15, 'Cuti'],
  [24, 'Terlambat'],
  [30, 'Sakit'],
  [53, 'Tidak Hadir'],
  [69, 'Cuti'],
  [83, 'Terlambat'],
  [98, 'Sakit'],
  [111, 'Tidak Hadir']
])

let employeeSequence = 0

export const employeeDetails = divisionProfiles.flatMap(profile =>
  Array.from({ length: profile.total }, (_, divisionIndex) => {
    employeeSequence += 1
    const generatedName = `${firstNames[(employeeSequence - 1) % firstNames.length]} ${lastNames[Math.floor((employeeSequence - 1) / firstNames.length) % lastNames.length]}`
    const employeeName = profile.key === 'technician'
      ? technicianNames[divisionIndex]
      : generatedName
    const joinedDay = String(1 + ((employeeSequence * 7) % 28)).padStart(2, '0')
    const joinedYear = 2020 + (employeeSequence % 6)

    return {
      id: `EMP-${String(employeeSequence).padStart(3, '0')}`,
      employee: employeeName,
      division: profile.label,
      position: profile.positions[divisionIndex % profile.positions.length],
      employment: employeeSequence % 4 === 0 ? 'Kontrak' : 'Tetap',
      attendance: attendanceOverrides.get(employeeSequence) ?? 'Hadir',
      joinedAt: `${joinedDay} Jul ${joinedYear}`
    }
  })
)

const attendanceOrder = ['Hadir', 'Terlambat', 'Cuti', 'Sakit', 'Tidak Hadir']

export const employeeMetrics = {
  total: employeeDetails.length,
  attendance: attendanceOrder.map(label => ({
    label,
    total: employeeDetails.filter(employee => employee.attendance === label).length
  })),
  divisions: divisionProfiles.map(profile => ({
    key: profile.key,
    label: profile.cardLabel,
    total: employeeDetails.filter(employee => employee.division === profile.label).length
  })),
  technician: {
    total: employeeDetails.filter(employee => employee.division === 'Teknisi').length,
    onsite: 5,
    standby: 2
  }
}

export const technicianEmployeeNames = employeeDetails
  .filter(employee => employee.division === 'Teknisi')
  .map(employee => employee.employee)

export function formatEmployeeCount(value: number) {
  return employeeCountFormatter.format(value)
}

export function getEmployeeAttendanceTotal(label: string) {
  return employeeMetrics.attendance.find(item => item.label === label)?.total ?? 0
}
