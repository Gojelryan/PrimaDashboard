# Dashboard Teknisi

# Purpose

Dashboard Teknisi disiapkan untuk kebutuhan monitoring pekerjaan teknisi.

Implementasi saat ini sudah menyusun layout, title card, icon, dan dummy data
untuk seluruh konten Teknisi.

---

# File Aktif

```text
src/pages/teknisi/
|-- TeknisiDashboard.vue
`-- sections/
    |-- TeknisiAnalytics.vue
    |-- TeknisiOperations.vue
    `-- TeknisiSummary.vue
```

Komponen pendukung:

```text
src/components/cards/
|-- AnalyticsCard.vue
|-- TechnicianMetricCard.vue
`-- TechnicianPanelCard.vue

src/components/charts/
`-- TechnicianDailyInstallationChart.vue
```

Mock data:

```text
src/mock/dashboard/
`-- technical-operations-dashboard.ts
```

---

# Sections

## 1. TeknisiSummary

Card:

- Total Tim
- Total Pekerjaan
- Total Infrastruktur Terbangun

Catatan:

- Seluruh data Teknisi berasal dari
  `src/mock/dashboard/technical-operations-dashboard.ts`.
- Jumlah dan nama anggota Tim Teknisi diturunkan dari roster bersama
  `src/mock/dashboard/employee-metrics.ts` agar konsisten dengan Dashboard
  Human Resource dan ringkasan Direksi.
- File mock yang sama digunakan Dashboard NOC untuk menjaga konsistensi data
  operasi teknis.
- Penarikan FO disimpan dan ditampilkan dalam satuan meter.
- Total/rincian infrastruktur memiliki satu sumber dan jumlah wilayah sama
  dengan nilai total.

## 2. TeknisiAnalytics

Card:

- Grafik Instalasi Pelanggan Baru
- Proyek Berdasarkan Lokasi / Proyek Berjalan

Catatan:

- Chart instalasi pelanggan baru memakai `technician.dailyInstallations`.
- Sumbu X chart memakai format tanggal harian, contoh `25/7`.
- Proyek berjalan memakai `technician.runningProjects`.

## 3. TeknisiOperations

Card:

- Performa Tim
- Barang Hampir Habis
- Aset Infrastruktur

Catatan:

- `Barang Hampir Habis` memakai `LowStockCard` yang sama dengan dashboard
  Operational dan hanya menampilkan stok di atas nol yang berada di bawah minimum.
- `Performa Tim` dan `Aset Infrastruktur` memakai group data `technician`
  dari mock bersama.

---

# Layout Height

- Baris summary: `auto-rows-[248px]`
- Baris analytics/project: `auto-rows-[360px]`
- Baris operations: `auto-rows-[320px]`

Tinggi card dikontrol oleh section grid. Component card memakai `h-full` agar mengikuti tinggi row.

---

# Status

Sudah ada:

- Page `TeknisiDashboard.vue`
- Section Teknisi
- Card title dan icon
- Dummy data 8 konten awal
- Menu sidebar `Teknisi`
- Integrasi sementara di `MainLayout.vue`

Belum ada:

- API integration
