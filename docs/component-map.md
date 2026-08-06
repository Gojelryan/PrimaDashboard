# PINISI ERP

# Component Map

Version: 1.3

---

# Tujuan

Dokumen ini menjadi peta komponen aktif frontend PINISI ERP.

---

# Struktur Komponen Aktif

```text
src/components/
|-- cards/
|   |-- AnalyticsCard.vue
|   |-- InformationListCard.vue
|   |-- LowStockCard.vue
|   |-- MarketingBranchCard.vue
|   |-- MarketingCustomerCard.vue
|   |-- MarketingStatusCard.vue
|   |-- MarketingTargetCard.vue
|   |-- NetworkCapacityCard.vue
|   |-- SummaryCard.vue
|   |-- TechnicianMetricCard.vue
|   `-- TechnicianPanelCard.vue
|-- charts/
|   |-- CustomerGrowthChart.vue
|   |-- DonutPartnerChart.vue
|   |-- RevenueChart.vue
|   `-- TechnicianDailyInstallationChart.vue
|-- header/
|   `-- AppHeader.vue
|-- sidebar/
|   `-- AppSidebar.vue
```

Catatan:

- Folder `common`, `tables`, `ui`, dan `widget` ada tetapi belum berisi komponen.

---

# Layout Aktif

```text
MainLayout
|-- AppSidebar
|-- AppHeader
|-- AdminDashboard
|-- DirectorDashboard
|-- FinanceDashboard
|-- HumanResourceDashboard
|-- MarketingDashboard
|-- NocDashboard
|-- OperationalDashboard
`-- TeknisiDashboard
```

Catatan:

- `MainLayout` memakai state lokal untuk memilih dashboard aktif.
- Vue Router belum aktif.
- Item navigasi memusatkan label, title, dan icon Lucide di
  `src/config/dashboard-navigation.ts`.

---

# Admin Dashboard Aktif

```text
AdminDashboard
|-- AdminSummary
|   `-- TechnicianMetricCard
|-- AdminCustomerSegments
|   `-- MarketingCustomerCard
`-- AdminBilling
    `-- TechnicianPanelCard
```

Data source:

```text
src/mock/dashboard/
|-- admin-customer-segments.ts
|-- admin-customer-status.ts
|-- admin-payment-customers.ts
`-- admin-receipt-collectors.ts
```

---

# Director Dashboard Aktif

```text
DirectorDashboard
|-- DashboardSummary
|   `-- SummaryCard
|-- DashboardAnalytics
|   |-- AnalyticsCard
|   |   `-- RevenueChart
|   |-- AnalyticsCard
|   |   `-- CustomerGrowthChart
|   `-- AnalyticsCard
|       `-- DonutPartnerChart
`-- DashboardInformation
    |-- InformationListCard
    `-- NetworkCapacityCard
```

Data source:

```text
src/mock/dashboard/
|-- customer-growth.ts
|-- customers-by-service.ts
|-- financial-metrics.ts
|-- infrastructure-expansion.ts
|-- internet-capacity.ts
|-- network-health.ts
|-- partner-distribution.ts
`-- summary-cards.ts
```

---

# Marketing Dashboard Aktif

```text
MarketingDashboard
|-- MarketingSummary
|   |-- MarketingCustomerCard
|   `-- MarketingTargetCard
|-- MarketingAnalytics
|   |-- AnalyticsCard
|   |   `-- CustomerGrowthChart
|   `-- MarketingBranchCard
`-- MarketingInformation
    |-- InformationListCard
    `-- MarketingStatusCard
```

Data source:

```text
src/mock/dashboard/
|-- customer-detail-data.ts
|-- customer-metrics.ts
|-- marketing-customer-summary.ts
|-- marketing-customers-by-service.ts
|-- marketing-port-status.ts
|-- partner-distribution.ts
`-- marketing-target-performance.ts
```

---

# Teknisi Dashboard Aktif

```text
TeknisiDashboard
|-- TeknisiSummary
|   |-- TechnicianMetricCard
|   `-- TechnicianPanelCard
|-- TeknisiAnalytics
|   |-- AnalyticsCard
|   |   `-- TechnicianDailyInstallationChart
|   `-- TechnicianPanelCard
`-- TeknisiOperations
    |-- LowStockCard
    `-- TechnicianPanelCard
```

Status:

- Dummy data 8 konten awal sudah dibuat.
- Card `Barang Hampir Habis` memakai `LowStockCard` bersama dengan Operational.

---

# Human Resource dan Finance Aktif

```text
MainLayout
|-- HumanResourceDashboard
|   |-- HumanResourceSummary
|   |-- HumanResourceAnalytics
|   `-- HumanResourcePriorities
`-- FinanceDashboard
    |-- FinanceSummary
    |-- FinanceAnalytics
    `-- FinanceTransactions
```

Status:

- Section mengambil mock data sementara.
- Chart menerima data melalui props.
- Layout sudah adaptif untuk desktop, tablet, dan mobile.

---

# NOC Dashboard Aktif

```text
NocDashboard
|-- NocSummary
|   `-- NetworkCapacityCard
`-- NocMonitoring
    |-- DashboardPanelCard
    |-- InformationListCard
    `-- NocIncidentChart
```

`InformationListCard` pada NOC menampilkan Kesehatan Jaringan di bawah
Riwayat Gangguan.

---

# Operational Dashboard Aktif

```text
OperationalDashboard
|-- OperationalSummary
|-- OperationalInventory
|   `-- DashboardPanelCard
`-- OperationalAlerts
    `-- LowStockCard
```

Data source:

```text
src/mock/dashboard/operational-dashboard.ts
```

---

# Reusable Components Aktif

- AppHeader
- AppSidebar
- MainLayout
- AnalyticsCard
- InformationListCard
- LowStockCard
- MarketingBranchCard
- MarketingCustomerCard
- MarketingStatusCard
- MarketingTargetCard
- NetworkCapacityCard
- SummaryCard
- TechnicianMetricCard
- TechnicianPanelCard
- DashboardPanelCard
- CustomerGrowthChart
- DonutPartnerChart
- RevenueChart
- TechnicianDailyInstallationChart
- HumanResourceOvertimeChart
- FinanceCashFlowChart
- FinanceOpexChart
- NocIncidentChart

---

# Chart Status

- `RevenueChart`: ApexCharts area chart.
- `CustomerGrowthChart`: ApexCharts line chart.
- `DonutPartnerChart`: ApexCharts donut chart.
- `TechnicianDailyInstallationChart`: ApexCharts line chart.
- `HumanResourceOvertimeChart`: ApexCharts donut chart.
- `FinanceCashFlowChart`: ApexCharts area chart.
- `FinanceOpexChart`: ApexCharts bar chart.
- `NocIncidentChart`: ApexCharts donut chart.

---

# Component Responsibility

## Page

- Menyusun section.
- Tidak berisi detail card.

## Section

- Mengatur layout section.
- Mengambil mock data sementara.
- Mengirim data ke component.

## Component

- Menampilkan UI.
- Menerima data lewat props.
- Tidak mengambil data backend secara langsung.
