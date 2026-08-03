# Components

Dokumen ini berisi daftar reusable component dan status implementasinya.

---

# Layout

Sudah ada:

- MainLayout
- AppSidebar
- AppHeader

Belum ada:

- PageContainer
- Footer

---

# Cards

Sudah ada:

- BaseCard
- CardHeader
- SummaryCard
- AnalyticsCard
- InformationListCard
- LowStockCard
- MarketingBranchCard
- MarketingCustomerCard
- MarketingStatusCard
- MarketingTargetCard
- NetworkCapacityCard
- TechnicianMetricCard
- TechnicianPanelCard
- DashboardPanelCard
- DetailAction

Fondasi:

- `BaseCard` memusatkan surface, radius, border, shadow, overflow, dan pilihan padding.
- `CardHeader` memusatkan hierarchy judul, subtitle, ikon, serta slot leading/aside.
- Card domain seperti `MarketingTargetCard` dan `TechnicianMetricCard` hanya mengatur isi serta logika khusus.
- Section dashboard tidak menulis ulang shell card.

Belum ada:

- FinancialCard
- ProgressCard
- StatisticCard
- StatusCard
- Button
- Badge

---

# Modal

Sudah ada:

- DetailTableModal

Fitur:

- Ringkasan metrik opsional.
- Pencarian lintas kolom.
- Tabel responsif dengan horizontal scroll.
- Status badge.
- Tutup melalui tombol, backdrop, atau tombol `Escape`.
- Mengunci scroll halaman selama modal terbuka.

---

# Charts

Sudah ada:

- RevenueChart
- CustomerGrowthChart
- DonutPartnerChart
- TechnicianDailyInstallationChart
- HumanResourceOvertimeChart
- FinanceCashFlowChart
- FinanceOpexChart
- NocIncidentChart

Catatan:

- Semua chart aktif memakai ApexCharts dan menerima data melalui props.

Target berikutnya:

- Reusable LineChart
- Reusable BarChart
- Reusable AreaChart
- Reusable PieChart

---

# Tables

Belum ada:

- DataTable
- EmployeeTable
- TicketTable

---

# Widgets

Belum ada:

- CustomerWidget
- EmployeeWidget
- NetworkWidget
- PartnerWidget

---

# Forms

Belum ada:

- SearchInput
- SelectFilter
- DatePicker

---

# Reusable Rules

Sebuah UI menjadi component apabila:

- Digunakan lebih dari satu kali, atau berpotensi dipakai lintas page.
- Memiliki fungsi tampilan yang jelas.
- Hanya data yang berubah.
- Tidak mengambil data backend secara langsung.
