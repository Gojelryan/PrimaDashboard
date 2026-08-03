import { customerMetrics } from './customer-metrics'
import { technicianEmployeeNames } from './employee-metrics'

export const isolatedCustomerDetails = [
  { id: 'CST-1042', customer: 'PT Bumi Karsa', service: 'Corporate 100 Mbps', invoice: 'INV-0726-1042', overdue: '18 hari', lastPayment: '12 Jun 2026', pic: 'Riska Mambu', status: 'Verifikasi' },
  { id: 'CST-1187', customer: 'CV Mandiri Jaya', service: 'Corporate 50 Mbps', invoice: 'INV-0726-1187', overdue: '15 hari', lastPayment: '15 Jun 2026', pic: 'Andi Pratama', status: 'Isolir' },
  { id: 'CST-2301', customer: 'Toko Sinar Baru', service: 'Retail 50 Mbps', invoice: 'INV-0726-2301', overdue: '13 hari', lastPayment: '17 Jun 2026', pic: 'Sitti Nurhaliza', status: 'Verifikasi' },
  { id: 'CST-2478', customer: 'Hotel Pantai Indah', service: 'Corporate 200 Mbps', invoice: 'INV-0726-2478', overdue: '12 hari', lastPayment: '18 Jun 2026', pic: 'Rizal Pongoh', status: 'Dijadwalkan' },
  { id: 'CST-3015', customer: 'Klinik Sehat Sentosa', service: 'Corporate 50 Mbps', invoice: 'INV-0726-3015', overdue: '11 hari', lastPayment: '19 Jun 2026', pic: 'Riska Mambu', status: 'Isolir' },
  { id: 'CST-3320', customer: 'Rumah Makan Bahari', service: 'Retail 30 Mbps', invoice: 'INV-0726-3320', overdue: '10 hari', lastPayment: '20 Jun 2026', pic: 'Sitti Nurhaliza', status: 'Verifikasi' },
  { id: 'CST-3654', customer: 'PT Sulawesi Logistik', service: 'Corporate 100 Mbps', invoice: 'INV-0726-3654', overdue: '9 hari', lastPayment: '21 Jun 2026', pic: 'Andi Pratama', status: 'Dijadwalkan' },
  { id: 'CST-3891', customer: 'Apotek Keluarga', service: 'Retail 50 Mbps', invoice: 'INV-0726-3891', overdue: '8 hari', lastPayment: '22 Jun 2026', pic: 'Rizal Pongoh', status: 'Isolir' },
  { id: 'CST-4107', customer: 'Yayasan Cerdas Bangsa', service: 'Corporate 75 Mbps', invoice: 'INV-0726-4107', overdue: '7 hari', lastPayment: '23 Jun 2026', pic: 'Riska Mambu', status: 'Verifikasi' },
  { id: 'CST-4289', customer: 'Koperasi Maju Bersama', service: 'Corporate 50 Mbps', invoice: 'INV-0726-4289', overdue: '6 hari', lastPayment: '24 Jun 2026', pic: 'Sitti Nurhaliza', status: 'Dijadwalkan' }
]

export const nocIncidentDetails = [
  { id: 'INC-2607-036', area: 'Gowa', category: 'Link Down', startedAt: '27 Jul 10:18', duration: '1j 42m', severity: 'Kritis', pic: 'Tim NOC 1', status: 'On Progress' },
  { id: 'INC-2607-035', area: 'Makassar Utara', category: 'High Latency', startedAt: '27 Jul 09:35', duration: '2j 25m', severity: 'Peringatan', pic: 'Tim NOC 2', status: 'On Progress' },
  { id: 'INC-2607-034', area: 'Makassar–Gowa', category: 'Fiber Optic Cut', startedAt: '27 Jul 08:12', duration: '3j 48m', severity: 'Kritis', pic: 'Tim FO 1', status: 'On Progress' },
  { id: 'INC-2607-033', area: 'Palopo', category: 'Power Off', startedAt: '26 Jul 22:40', duration: '5j 20m', severity: 'Peringatan', pic: 'Tim NOC 3', status: 'Tunda' },
  { id: 'INC-2607-032', area: 'Pangkep', category: 'Hardware Error', startedAt: '26 Jul 18:15', duration: '2j 10m', severity: 'Kritis', pic: 'Tim NOC 2', status: 'Selesai' },
  { id: 'INC-2607-031', area: 'Maros', category: 'Link Down', startedAt: '26 Jul 14:22', duration: '1j 35m', severity: 'Kritis', pic: 'Tim FO 2', status: 'Selesai' },
  { id: 'INC-2607-030', area: 'Barru', category: 'High Latency', startedAt: '26 Jul 11:04', duration: '3j 05m', severity: 'Peringatan', pic: 'Tim NOC 1', status: 'Selesai' },
  { id: 'INC-2607-029', area: 'Pinrang', category: 'Power Off', startedAt: '25 Jul 23:18', duration: '6j 42m', severity: 'Peringatan', pic: 'Tim NOC 3', status: 'Tunda' },
  { id: 'INC-2607-028', area: 'Parepare', category: 'Fiber Optic Cut', startedAt: '25 Jul 16:45', duration: '4j 12m', severity: 'Kritis', pic: 'Tim FO 1', status: 'Selesai' },
  { id: 'INC-2607-027', area: 'Makassar', category: 'Hardware Error', startedAt: '25 Jul 09:30', duration: '2j 28m', severity: 'Kritis', pic: 'Tim NOC 2', status: 'Selesai' }
]

export const receivableDetails = [
  { id: 'AR-2026-071', customer: 'PT Nusantara Digital', invoice: 'INV-AR-071', dueDate: '10 Jul 2026', age: '10 hari', amount: 'Rp 520.000.000', status: 'Lewat Jatuh Tempo' },
  { id: 'AR-2026-072', customer: 'Pemkab Gowa', invoice: 'INV-AR-072', dueDate: '15 Jul 2026', age: '5 hari', amount: 'Rp 410.000.000', status: 'Lewat Jatuh Tempo' },
  { id: 'AR-2026-073', customer: 'Universitas Sulawesi', invoice: 'INV-AR-073', dueDate: '22 Jul 2026', age: '—', amount: 'Rp 350.000.000', status: 'Belum Jatuh Tempo' },
  { id: 'AR-2026-074', customer: 'RS Sehat Makassar', invoice: 'INV-AR-074', dueDate: '25 Jul 2026', age: '—', amount: 'Rp 300.000.000', status: 'Belum Jatuh Tempo' },
  { id: 'AR-2026-075', customer: 'PT Maros Industri', invoice: 'INV-AR-075', dueDate: '28 Jul 2026', age: '—', amount: 'Rp 280.000.000', status: 'Belum Jatuh Tempo' },
  { id: 'AR-2026-076', customer: 'Hotel Bahari Indah', invoice: 'INV-AR-076', dueDate: '31 Jul 2026', age: '—', amount: 'Rp 240.000.000', status: 'Belum Jatuh Tempo' }
]

export const payableDetails = [
  { id: 'AP-2026-041', vendor: 'PT Fiber Optik Indonesia', invoice: 'INV-FOI-8821', dueDate: '28 Jul 2026', category: 'Infrastruktur', amount: 'Rp 175.000.000', status: 'Jatuh Tempo' },
  { id: 'AP-2026-042', vendor: 'PT Data Transit Asia', invoice: 'INV-DTA-1908', dueDate: '30 Jul 2026', category: 'IP Transit', amount: 'Rp 140.000.000', status: 'Belum Jatuh Tempo' },
  { id: 'AP-2026-043', vendor: 'CV Solusi Network', invoice: 'INV-SN-4720', dueDate: '2 Agu 2026', category: 'Perangkat', amount: 'Rp 100.000.000', status: 'Belum Jatuh Tempo' },
  { id: 'AP-2026-044', vendor: 'PT Energi Sulawesi', invoice: 'INV-ES-2207', dueDate: '5 Agu 2026', category: 'Utilitas', amount: 'Rp 80.000.000', status: 'Belum Jatuh Tempo' },
  { id: 'AP-2026-045', vendor: 'CV Properti Mandiri', invoice: 'INV-PM-0731', dueDate: '8 Agu 2026', category: 'Property', amount: 'Rp 55.000.000', status: 'Belum Jatuh Tempo' }
]

export const technicianJobDetails = [
  { id: 'WO-2607-124', customer: 'Kampus UNM Makassar', location: 'Makassar', type: 'Instalasi Jaringan', technician: technicianEmployeeNames[0], deadline: '31 Jul 2026', progress: '70%', status: 'On Progress' },
  { id: 'WO-2607-123', customer: 'Pemkab Wajo', location: 'Wajo', type: 'Penarikan FO', technician: technicianEmployeeNames[1], deadline: '2 Agu 2026', progress: '30%', status: 'On Progress' },
  { id: 'WO-2607-122', customer: 'Perumahan ABCD', location: 'Gowa', type: 'Pembangunan FO', technician: technicianEmployeeNames[2], deadline: '30 Jul 2026', progress: '80%', status: 'On Progress' },
  { id: 'WO-2607-121', customer: 'Pemda Bulukumba', location: 'Bulukumba', type: 'Instalasi CCTV', technician: technicianEmployeeNames[3], deadline: '5 Agu 2026', progress: '50%', status: 'On Progress' },
  { id: 'WO-2607-120', customer: 'PT Gowa Industri', location: 'Gowa', type: 'Aktivasi Corporate', technician: technicianEmployeeNames[4], deadline: '27 Jul 2026', progress: '100%', status: 'Selesai' },
  { id: 'WO-2607-119', customer: 'RSUD Barru', location: 'Barru', type: 'Perbaikan Link', technician: technicianEmployeeNames[5], deadline: '27 Jul 2026', progress: '100%', status: 'Selesai' },
  { id: 'WO-2607-118', customer: 'Diskominfo Palopo', location: 'Palopo', type: 'Upgrade Kapasitas', technician: technicianEmployeeNames[6], deadline: '29 Jul 2026', progress: '45%', status: 'Tunda' },
  { id: 'WO-2607-117', customer: 'Kantor Bupati Pinrang', location: 'Pinrang', type: 'Relokasi ODP', technician: technicianEmployeeNames[0], deadline: '1 Agu 2026', progress: '60%', status: 'On Progress' },
  { id: 'WO-2607-116', customer: 'Hotel Pantai Indah', location: 'Parepare', type: 'Instalasi Corporate', technician: technicianEmployeeNames[1], deadline: '26 Jul 2026', progress: '100%', status: 'Selesai' },
  { id: 'WO-2607-115', customer: 'CV Mandiri Jaya', location: 'Maros', type: 'Perbaikan FO', technician: technicianEmployeeNames[2], deadline: '28 Jul 2026', progress: '25%', status: 'Tunda' }
]

export const operationalItemRequestDetails = [
  { id: 'REQ-2607-037', requester: 'Andi Pratama', division: 'Teknisi', item: 'ODP 16 Core', quantity: '12 unit', requestedAt: '27 Jul 2026', approver: 'Kepala Operasional', status: 'Menunggu' },
  { id: 'REQ-2607-036', requester: 'Rizal Pongoh', division: 'Teknisi', item: 'Drop Cable', quantity: '2.000 meter', requestedAt: '27 Jul 2026', approver: 'Kepala Operasional', status: 'Menunggu' },
  { id: 'REQ-2607-035', requester: 'Tim NOC 1', division: 'NOC', item: 'Router Mikrotik', quantity: '2 unit', requestedAt: '27 Jul 2026', approver: 'Direktur Teknik', status: 'Menunggu' },
  { id: 'REQ-2607-034', requester: technicianEmployeeNames[2], division: 'Teknisi', item: 'Fast Connector', quantity: '50 unit', requestedAt: '26 Jul 2026', approver: 'Kepala Operasional', status: 'Disetujui' },
  { id: 'REQ-2607-033', requester: 'Sitti Nurhaliza', division: 'Admin', item: 'Patch Cord SC/UPC', quantity: '10 unit', requestedAt: '26 Jul 2026', approver: 'Kepala Operasional', status: 'Disetujui' },
  { id: 'REQ-2607-032', requester: 'Tim FO 2', division: 'Teknisi', item: 'Closure Fiber Optic', quantity: '4 unit', requestedAt: '25 Jul 2026', approver: 'Kepala Operasional', status: 'Diproses' },
  { id: 'REQ-2607-031', requester: 'Tim NOC 3', division: 'NOC', item: 'UPS 3000 VA', quantity: '1 unit', requestedAt: '25 Jul 2026', approver: 'Direktur Teknik', status: 'Tunda' },
  { id: 'REQ-2607-030', requester: technicianEmployeeNames[3], division: 'Teknisi', item: 'PLC Splitter 1:8', quantity: '8 unit', requestedAt: '24 Jul 2026', approver: 'Kepala Operasional', status: 'Selesai' }
]

export const outOfStockDetails = [
  { id: 'STK-OLT-011', item: 'Router Mikrotik', minimum: '5 unit', available: '0 unit', lastRequest: '27 Jul 2026', supplier: 'CV Solusi Network', eta: '2 Agu 2026', status: 'Dipesan' },
  { id: 'STK-SW-024', item: 'Switch Managed 24 Port', minimum: '3 unit', available: '0 unit', lastRequest: '26 Jul 2026', supplier: 'PT Network Utama', eta: '31 Jul 2026', status: 'Diproses' },
  { id: 'STK-RACK-42', item: 'Rack Server 42U', minimum: '2 unit', available: '0 unit', lastRequest: '25 Jul 2026', supplier: 'CV Data Center Mandiri', eta: '5 Agu 2026', status: 'Menunggu' }
]

export const corporateCustomerDetails = [
  { id: `COR-${String(customerMetrics.corporate.total).padStart(4, '0')}`, customer: 'PT Nusantara Digital', area: 'Makassar', package: 'Corporate 500 Mbps', joinedAt: '4 Jul 2026', outstanding: 'Rp 0', status: 'Baru' },
  { id: `COR-${String(customerMetrics.corporate.total - 1).padStart(4, '0')}`, customer: 'Pemkab Gowa', area: 'Gowa', package: 'Corporate 200 Mbps', joinedAt: '8 Jul 2026', outstanding: 'Rp 240.000.000', status: 'Aktif' },
  { id: `COR-${String(customerMetrics.corporate.total - 2).padStart(4, '0')}`, customer: 'Universitas Sulawesi', area: 'Makassar', package: 'Corporate 300 Mbps', joinedAt: '10 Jul 2026', outstanding: 'Rp 180.000.000', status: 'Baru' },
  { id: `COR-${String(customerMetrics.corporate.total - 3).padStart(4, '0')}`, customer: 'RS Sehat Makassar', area: 'Makassar', package: 'Corporate 100 Mbps', joinedAt: '12 Jul 2026', outstanding: 'Rp 95.000.000', status: 'Aktif' },
  { id: `COR-${String(customerMetrics.corporate.total - 4).padStart(4, '0')}`, customer: 'PT Maros Industri', area: 'Maros', package: 'Corporate 200 Mbps', joinedAt: '15 Jul 2026', outstanding: 'Rp 210.000.000', status: 'Baru' },
  { id: `COR-${String(customerMetrics.corporate.total - 5).padStart(4, '0')}`, customer: 'Hotel Bahari Indah', area: 'Parepare', package: 'Corporate 100 Mbps', joinedAt: '18 Jul 2026', outstanding: 'Rp 75.000.000', status: 'Aktif' },
  { id: `COR-${String(customerMetrics.corporate.total - 6).padStart(4, '0')}`, customer: 'CV Mandiri Jaya', area: 'Pangkep', package: 'Corporate 50 Mbps', joinedAt: '20 Jul 2026', outstanding: 'Rp 48.000.000', status: 'Putus' },
  { id: `COR-${String(customerMetrics.corporate.total - 7).padStart(4, '0')}`, customer: 'Klinik Sehat Sentosa', area: 'Bone', package: 'Corporate 75 Mbps', joinedAt: '21 Jul 2026', outstanding: 'Rp 32.000.000', status: 'Baru' }
]

export const retailCustomerDetails = [
  { id: `RTL-${customerMetrics.retail.total}`, customer: 'Andi Saputra', area: 'Makassar', package: 'Retail 50 Mbps', joinedAt: '6 Jul 2026', outstanding: 'Rp 0', status: 'Baru' },
  { id: `RTL-${customerMetrics.retail.total - 1}`, customer: 'Nur Aisyah', area: 'Gowa', package: 'Retail 30 Mbps', joinedAt: '8 Jul 2026', outstanding: 'Rp 350.000', status: 'Aktif' },
  { id: `RTL-${customerMetrics.retail.total - 2}`, customer: 'Muhammad Rizal', area: 'Maros', package: 'Retail 50 Mbps', joinedAt: '11 Jul 2026', outstanding: 'Rp 0', status: 'Baru' },
  { id: `RTL-${customerMetrics.retail.total - 3}`, customer: 'Sitti Aminah', area: 'Pangkep', package: 'Retail 30 Mbps', joinedAt: '13 Jul 2026', outstanding: 'Rp 525.000', status: 'Aktif' },
  { id: `RTL-${customerMetrics.retail.total - 4}`, customer: 'Fajar Hidayat', area: 'Bone', package: 'Retail 100 Mbps', joinedAt: '15 Jul 2026', outstanding: 'Rp 0', status: 'Baru' },
  { id: `RTL-${customerMetrics.retail.total - 5}`, customer: 'Rahmawati', area: 'Sidrap', package: 'Retail 50 Mbps', joinedAt: '17 Jul 2026', outstanding: 'Rp 420.000', status: 'Putus' },
  { id: `RTL-${customerMetrics.retail.total - 6}`, customer: 'Irfan Maulana', area: 'Palopo', package: 'Retail 30 Mbps', joinedAt: '19 Jul 2026', outstanding: 'Rp 0', status: 'Baru' },
  { id: `RTL-${customerMetrics.retail.total - 7}`, customer: 'Yuliana Putri', area: 'Pinrang', package: 'Retail 50 Mbps', joinedAt: '22 Jul 2026', outstanding: 'Rp 280.000', status: 'Aktif' }
]
