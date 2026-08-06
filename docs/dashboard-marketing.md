# Dashboard Marketing

# Purpose

Dashboard Marketing digunakan untuk monitoring performa pelanggan, target penjualan, distribusi mitra, status port wilayah, dan pelanggan berdasarkan segmen.

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
|-- customer-detail-data.ts
|-- customer-metrics.ts
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

Pada card Corporate, label ringkas tetap memakai `Pelanggan Baru` dan
`Pelanggan Putus`. Keterangan year-to-date (YTD) 2026 sampai periode aktif Agustus
2026 ditampilkan pada ringkasan popup detail agar card tetap ringkas.

Pada card dan popup Retail, label `Pelanggan Baru Bulan Ini` dan `Pelanggan
Putus Bulan Ini` menunjukkan pergerakan pelanggan pada periode bulanan aktif.

Popup Corporate dan Retail masing-masing menampilkan sampel dummy 100
pelanggan dengan 10 baris per halaman. Kolom status dipisahkan menjadi status
layanan dan status tagihan. Keterangan periode hanya ditampilkan pada tabel
Corporate sebagai penanda YTD.

Tabel popup Retail menampilkan `Iuran` berdasarkan paket 10, 20, 30, 50, 100,
atau 200 Mbps. Outstanding agregat tetap ditampilkan pada ringkasan popup.
Header tabel Corporate dan Retail dapat dipakai untuk sorting teks, tanggal,
status, serta nilai Outstanding/Iuran.

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

- Tren Pelanggan & Pendapatan (Januari–Agustus 2026)
- Distribusi Mitra dalam bentuk list Wilayah, Mitra, dan Pelanggan
- Popup 21 Mitra yang menampilkan total pelanggan masing-masing

## 3. MarketingInformation

Menampilkan informasi tambahan.

Komponen:

- InformationListCard
- MarketingStatusCard

Mock:

- `marketing-customers-by-service.ts`
- `marketing-port-status.ts`

Card:

- Pelanggan per Segmen
- Status Port Wilayah

Status port memakai 35.000 Home Pass, target 25.000 Home Connect, dan 10.000
port kosong dari sumber kapasitas akuisisi Retail yang sama.

---

# Layout Height

- Baris summary: `auto-rows-[224px]`
- Baris analytics/distribusi mitra: `auto-rows-[420px]`
- Baris information/status port: minimum `360px`

Tinggi card dikontrol oleh section grid. Component card memakai `h-full` agar mengikuti tinggi row.
