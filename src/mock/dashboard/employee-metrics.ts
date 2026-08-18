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
    key: 'technical',
    label: 'Teknis',
    cardLabel: 'Teknis',
    total: 52,
    positions: ['Teknisi Senior', 'Teknisi FO', 'Teknisi Instalasi']
  },
  {
    key: 'market',
    label: 'Market',
    cardLabel: 'Market',
    total: 7,
    positions: ['Account Executive', 'Marketing Analyst', 'Sales Support']
  },
  {
    key: 'admin',
    label: 'Admin',
    cardLabel: 'Admin',
    total: 8,
    positions: ['Admin Billing', 'Admin Customer', 'Kolektor']
  },
  {
    key: 'finance',
    label: 'Finance',
    cardLabel: 'Finance',
    total: 8,
    positions: ['Finance Officer', 'Accountant', 'Treasury Staff']
  },
  {
    key: 'noc',
    label: 'NOC',
    cardLabel: 'NOC',
    total: 15,
    positions: ['NOC Engineer', 'Network Monitoring', 'NOC Support']
  },
  {
    key: 'it',
    label: 'IT',
    cardLabel: 'IT',
    total: 5,
    positions: ['System Administrator', 'Software Engineer', 'IT Support']
  },
  {
    key: 'warehouse',
    label: 'Gudang',
    cardLabel: 'Gudang',
    total: 10,
    positions: ['Koordinator Gudang', 'Inventory Staff', 'Logistic Staff']
  },
  {
    key: 'general',
    label: 'Umum',
    cardLabel: 'Umum',
    total: 11,
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
    const employeeName = profile.key === 'technical' && technicianNames[divisionIndex]
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
const technicalEmployeeDetails = employeeDetails.filter(
  employee => employee.division === 'Teknis'
)
export const marketingEmployeeDetails = employeeDetails.filter(
  employee => employee.division === 'Market'
)
const technicalOnsiteTotal = Math.round(technicalEmployeeDetails.length * 5 / 7)

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
    total: technicalEmployeeDetails.length,
    onsite: technicalOnsiteTotal,
    standby: technicalEmployeeDetails.length - technicalOnsiteTotal
  },
  marketing: {
    total: marketingEmployeeDetails.length
  }
}

export const technicianEmployeeNames = technicalEmployeeDetails
  .map(employee => employee.employee)

export function getEmployeeAttendanceTotal(label: string) {
  return employeeMetrics.attendance.find(item => item.label === label)?.total ?? 0
}
