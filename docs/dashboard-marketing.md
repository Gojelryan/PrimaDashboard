# Dashboard Marketing

# Purpose

Dashboard Marketing digunakan untuk monitoring performa pelanggan, target penjualan, cabang retail/mitra, status port wilayah, dan pelanggan berdasarkan layanan.

Implementasi saat ini memakai mock data lokal.

---

# File Aktif

```text
src/pages/marketing/
|-- MarketingDashboard.vue
`-- sections/
    |-- MarketingAnalytics.vue
    |-- MarketingInformation.vue
    `-- MarketingSummary.vue
```

Komponen pendukung:

```text
src/components/cards/
|-- AnalyticsCard.vue
|-- InformationListCard.vue
|-- MarketingBranchCard.vue
|-- MarketingCustomerCard.vue
|-- MarketingStatusCard.vue
`-- MarketingTargetCard.vue

src/components/charts/
`-- CustomerGrowthChart.vue
```

Mock data:

```text
src/mock/dashboard/
|-- marketing-branch-retail-partners.ts (alias kompatibilitas)
|-- marketing-customer-summary.ts
|-- marketing-customers-by-service.ts
|-- marketing-port-status.ts
|-- partner-distribution.ts
`-- marketing-target-performance.ts
```

---

# Sections

## 1. MarketingSummary

Menampilkan ringkasan utama.

Komponen:

- MarketingCustomerCard
- MarketingTargetCard

Mock:

- `marketing-customer-summary.ts`
- `marketing-target-performance.ts`

Card:

- Corporate
- Retail
- Target Corporate
- Target Retail

## 2. MarketingAnalytics

Menampilkan chart dan informasi operasional marketing.

Komponen:

- AnalyticsCard
- CustomerGrowthChart
- MarketingBranchCard

Mock:

- `partner-distribution.ts` (sumber yang sama dengan dashboard Direksi)
- `marketing-branch-retail-partners.ts` hanya menjadi alias kompatibilitas ke
  `partner-distribution.ts` dan tidak menyimpan angka terpisah.

Card:

- Grafik Kenaikan Pelanggan
- Distribusi Mitra dalam bentuk list Wilayah, Mitra, dan Pelanggan

## 3. MarketingInformation

Menampilkan informasi tambahan.

Komponen:

- InformationListCard
- MarketingStatusCard

Mock:

- `marketing-customers-by-service.ts`
- `marketing-port-status.ts`

Card:

- Pelanggan dengan Layanan
- Status Port Wilayah

---

# Layout Height

- Baris summary: `auto-rows-[224px]`
- Baris analytics/distribusi mitra: `auto-rows-[420px]`
- Baris information/status port: minimum `360px`

Tinggi card dikontrol oleh section grid. Component card memakai `h-full` agar mengikuti tinggi row.
