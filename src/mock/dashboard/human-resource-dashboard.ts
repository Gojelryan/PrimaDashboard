import {
  employeeMetrics,
  formatEmployeeCount,
} from './employee-metrics'

export const employeeOvertimeDetails = [
  {
    id: 'OT-2607-001',
    employee: 'Andi Pratama Yusuf',
    date: '8 Jul 2026',
    startTime: '18:00',
    endTime: '23:00',
    hours: 5,
    description: 'Penyelesaian instalasi dan aktivasi pelanggan corporate.',
    status: 'Disetujui',
  },
  {
    id: 'OT-2607-002',
    employee: 'Andi Pratama Yusuf',
    date: '17 Jul 2026',
    startTime: '18:00',
    endTime: '23:00',
    hours: 5,
    description: 'Penarikan kabel FO dan pengujian redaman jalur.',
    status: 'Disetujui',
  },
  {
    id: 'OT-2607-003',
    employee: 'Rizal Pongoh',
    date: '10 Jul 2026',
    startTime: '19:00',
    endTime: '22:00',
    hours: 3,
    description: 'Penanganan gangguan koneksi pelanggan prioritas.',
    status: 'Disetujui',
  },
  {
    id: 'OT-2607-004',
    employee: 'Rizal Pongoh',
    date: '22 Jul 2026',
    startTime: '18:30',
    endTime: '21:30',
    hours: 3,
    description: 'Pemeliharaan perangkat dan normalisasi jaringan.',
    status: 'Disetujui',
  },
  {
    id: 'OT-2607-005',
    employee: 'Fadli Lahay',
    date: '12 Jul 2026',
    startTime: '18:00',
    endTime: '20:00',
    hours: 2,
    description: 'Pengecekan material dan persiapan instalasi berikutnya.',
    status: 'Disetujui',
  },
  {
    id: 'OT-2607-006',
    employee: 'Fadli Lahay',
    date: '25 Jul 2026',
    startTime: '18:00',
    endTime: '21:00',
    hours: 3,
    description: 'Dokumentasi hasil instalasi dan pembaruan data pelanggan.',
    status: 'Disetujui',
  },
  {
    id: 'OT-2607-007',
    employee: 'Arsyad Palallo',
    date: '15 Jul 2026',
    startTime: '18:30',
    endTime: '21:30',
    hours: 3,
    description: 'Pendampingan migrasi layanan pelanggan corporate.',
    status: 'Disetujui',
  },
  {
    id: 'OT-2607-008',
    employee: 'Arman Tangkudung',
    date: '9 Jul 2026',
    startTime: '17:00',
    endTime: '21:00',
    hours: 4,
    description: 'Penerimaan barang dan rekonsiliasi stok gudang.',
    status: 'Disetujui',
  },
  {
    id: 'OT-2607-009',
    employee: 'Arman Tangkudung',
    date: '27 Jul 2026',
    startTime: '17:00',
    endTime: '21:00',
    hours: 4,
    description: 'Persiapan dan distribusi material untuk tim lapangan.',
    status: 'Disetujui',
  },
  {
    id: 'OT-2607-010',
    employee: 'Sitti Nurhaliza',
    date: '6 Jul 2026',
    startTime: '18:00',
    endTime: '22:00',
    hours: 4,
    description: 'Rekapitulasi absensi dan validasi data lembur karyawan.',
    status: 'Disetujui',
  },
  {
    id: 'OT-2607-011',
    employee: 'Sitti Nurhaliza',
    date: '20 Jul 2026',
    startTime: '18:00',
    endTime: '22:00',
    hours: 4,
    description: 'Persiapan payroll dan pemeriksaan dokumen tunjangan.',
    status: 'Disetujui',
  },
  {
    id: 'OT-2607-012',
    employee: 'Sitti Nurhaliza',
    date: '29 Jul 2026',
    startTime: '18:00',
    endTime: '22:00',
    hours: 4,
    description: 'Penyelesaian laporan HR dan administrasi kontrak.',
    status: 'Menunggu verifikasi',
  },
]

export const employeeLeaveRequests = [
  {
    id: 'CUTI-2608-001',
    employeeId: 'EMP-015',
    employee: 'Putri Mambu',
    division: 'Teknis',
    leaveType: 'Cuti Tahunan',
    submittedAt: '30 Jul 2026',
    period: '5–6 Agu 2026',
    totalDays: 2,
    reason: 'Keperluan keluarga di luar kota.',
    directSupervisor: {
      name: 'Rahma Permata',
      status: 'Disetujui',
      decidedAt: '31 Jul 2026',
    },
    hrApproval: {
      name: 'Sitti Nurhaliza',
      status: 'Menunggu',
      decidedAt: '—',
    },
    status: 'Menunggu HR',
  },
  {
    id: 'CUTI-2608-002',
    employeeId: 'EMP-001',
    employee: 'Andi Pratama Yusuf',
    division: 'Teknis',
    leaveType: 'Cuti Keperluan Penting',
    submittedAt: '1 Agu 2026',
    period: '10 Agu 2026',
    totalDays: 1,
    reason: 'Menghadiri acara keluarga inti.',
    directSupervisor: {
      name: 'Budi Santoso',
      status: 'Menunggu',
      decidedAt: '—',
    },
    hrApproval: {
      name: 'Sitti Nurhaliza',
      status: 'Belum diproses',
      decidedAt: '—',
    },
    status: 'Menunggu Atasan Langsung',
  },
  {
    id: 'CUTI-2608-003',
    employeeId: 'EMP-069',
    employee: 'Yohana Ramadhan',
    division: 'Finance',
    leaveType: 'Cuti Tahunan',
    submittedAt: '1 Agu 2026',
    period: '12–14 Agu 2026',
    totalDays: 3,
    reason: 'Keperluan administrasi keluarga.',
    directSupervisor: {
      name: 'Muhammad Akbar',
      status: 'Disetujui',
      decidedAt: '2 Agu 2026',
    },
    hrApproval: {
      name: 'Sitti Nurhaliza',
      status: 'Menunggu',
      decidedAt: '—',
    },
    status: 'Menunggu HR',
  },
  {
    id: 'CUTI-2608-004',
    employeeId: 'EMP-089',
    employee: 'Yohana Lestari',
    division: 'NOC',
    leaveType: 'Cuti Tahunan',
    submittedAt: '2 Agu 2026',
    period: '17–18 Agu 2026',
    totalDays: 2,
    reason: 'Pulang kampung dan keperluan keluarga.',
    directSupervisor: {
      name: 'Ilham Mahendra',
      status: 'Menunggu',
      decidedAt: '—',
    },
    hrApproval: {
      name: 'Sitti Nurhaliza',
      status: 'Belum diproses',
      decidedAt: '—',
    },
    status: 'Menunggu Atasan Langsung',
  },
]

const overtimeEmployeeNames = [
  ...new Set(employeeOvertimeDetails.map(item => item.employee)),
]

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
  overtime: overtimeEmployeeNames.map(name => ({
    name,
    hours: employeeOvertimeDetails
      .filter(item => item.employee === name)
      .reduce((total, item) => total + item.hours, 0),
  })),
  overtimeByDivision: [
    { label: 'Teknis', hours: 12 },
    { label: 'NOC', hours: 6 },
    { label: 'Admin', hours: 10 },
    { label: 'Finance', hours: 3 },
    { label: 'IT', hours: 5 },
    { label: 'Market', hours: 2 },
    { label: 'Gudang', hours: 2 },
    { label: 'Umum', hours: 4 }
  ],
  priorities: [
    {
      label: 'Pengajuan Cuti menunggu',
      value: 'Tinggi',
      detailType: 'leave-request',
    },
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
