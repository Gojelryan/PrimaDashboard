# Dashboard Direksi

# Purpose

Dashboard Direksi digunakan sebagai pusat monitoring aktivitas perusahaan.

Implementasi saat ini memakai mock data lokal. API layer sudah disiapkan, tetapi UI belum mengambil data dari service.

---

# File Aktif

```text
src/pages/director/
|-- DirectorDashboard.vue
`-- sections/
    |-- DashboardAnalytics.vue
    |-- DashboardInformation.vue
    `-- DashboardSummary.vue
```

Komponen pendukung:

```text
src/components/cards/
|-- AnalyticsCard.vue
|-- InformationListCard.vue
|-- NetworkCapacityCard.vue
`-- SummaryCard.vue

src/components/charts/
|-- CustomerGrowthChart.vue
|-- DonutPartnerChart.vue
`-- RevenueChart.vue
```

Mock data:

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

# Sections

## 1. Summary

Menampilkan KPI utama.

File:

- `DashboardSummary.vue`
- `SummaryCard.vue`
- `summary-cards.ts`

Widget:

- Total Karyawan
- Total Pekerjaan
- Total Ticket
- Corporate
- Retail

## 2. Analytics

Menampilkan visual analitik.

File:

- `DashboardAnalytics.vue`
- `AnalyticsCard.vue`
- `RevenueChart.vue`
- `CustomerGrowthChart.vue`
- `DonutPartnerChart.vue`

Status:

- Section mengimpor mock data dan meneruskannya ke chart melalui props.
- Pergerakan Keuangan memakai sumber dan periode yang sama dengan Finance.
- Data Corporate pada `CustomerGrowthChart.vue` merupakan pendapatan.
- Data Retail internal dan Mitra merupakan jumlah pelanggan dan tetap dipisahkan.
- Tren pelanggan Retail dan Mitra memuat realisasi Januari–Agustus 2026.

## 3. Information

Menampilkan informasi pendukung dashboard.

File:

- `DashboardInformation.vue`
- `InformationListCard.vue`
- `NetworkCapacityCard.vue`

Mock:

- `customers-by-service.ts`
- `infrastructure-expansion.ts`
- `internet-capacity.ts`
- `network-health.ts`

Card:

- Pelanggan berdasarkan segmen
- Ekspansi & Infrastruktur
- Kapasitas Internet
- Kesehatan Jaringan

---

# Catatan Data

- `partner-distribution.ts` memiliki `totalCustomer` dan detail area.
- Saat ini `DonutPartnerChart.vue` menghitung total pelanggan dari detail area.
- Data backend nanti sebaiknya mengirim angka mentah, lalu frontend melakukan formatting.
- Card Kapasitas Internet memakai `NetworkCapacityCard` yang sama dengan NOC.

---

# Future Features

- Realtime monitoring
- Export PDF
- Export Excel
- Filter tanggal
- Filter area
- Integrasi API `/api/dashboard/director`
- Loading state
- Error state
- Empty state
