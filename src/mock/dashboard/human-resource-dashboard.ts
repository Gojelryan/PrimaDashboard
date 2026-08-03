import {
  employeeMetrics,
  formatEmployeeCount,
} from './employee-metrics'

export const humanResourceDashboard = {
  period: 'Juli 2026',
  employeeSummary: {
    total: formatEmployeeCount(employeeMetrics.total),
    attendance: employeeMetrics.attendance.map(item => ({
      label: item.label,
      value: formatEmployeeCount(item.total)
    }))
  },
  divisions: employeeMetrics.divisions.map(division => ({
    label: division.label,
    value: formatEmployeeCount(division.total)
  })),
  overtime: [
    { name: 'Andi Pratama Yusuf', hours: 10 },
    { name: 'Rizal Pongoh', hours: 6 },
    { name: 'Fadli Lahay', hours: 5 },
    { name: 'Arsyad Palallo', hours: 3 },
    { name: 'Arman Tangkudung', hours: 8 },
    { name: 'Sitti Nurhaliza', hours: 12 }
  ],
  overtimeByDivision: [
    { label: 'Teknisi', hours: 12 },
    { label: 'NOC', hours: 6 },
    { label: 'Admin', hours: 10 },
    { label: 'Finance', hours: 3 },
    { label: 'HR', hours: 2 },
    { label: 'IT', hours: 5 },
    { label: 'Marketing', hours: 2 },
    { label: 'Umum', hours: 4 }
  ],
  priorities: [
    { label: 'Pengajuan Cuti menunggu', value: 'Tinggi' },
    { label: 'Kontrak Karyawan', value: 'Tinggi' },
    { label: 'Review Absensi bulanan', value: 'Sedang' },
    { label: 'Review Lembur', value: 'Sedang' },
    { label: 'Evaluasi Kinerja', value: 'Rendah' },
    { label: 'Review Struktur Organisasi', value: 'Rendah' }
  ],
  payroll: {
    total: 'Rp 482.500.000',
    growth: '+5%',
    basic: 'Rp 365.000.000',
    overtime: 'Rp 42.500.000',
    allowance: 'Rp 75.000.000'
  }
}
