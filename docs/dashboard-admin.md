# Dashboard Admin

# Purpose

Dashboard Admin disiapkan untuk monitoring pelanggan, status layanan, kolektor kwitansi, dan payment customer.

Implementasi saat ini sudah menyusun layout, card, icon, dan dummy data awal berdasarkan rancangan dashboard admin.

---

# File Aktif

```text
src/pages/admin/
|-- AdminDashboard.vue
`-- sections/
    |-- AdminBilling.vue
    |-- AdminCustomerSegments.vue
    `-- AdminSummary.vue
```

Komponen pendukung:

```text
src/components/cards/
|-- MarketingCustomerCard.vue
|-- TechnicianMetricCard.vue
`-- TechnicianPanelCard.vue
```

Mock data:

```text
src/mock/dashboard/
|-- admin-customer-segments.ts
|-- admin-customer-status.ts
|-- admin-payment-customers.ts
`-- admin-receipt-collectors.ts
```

---

# Sections

## 1. AdminSummary

Card:

- Total Pelanggan
- Aktif
- Isolir
- Non-Aktif

## 2. AdminCustomerSegments

Card:

- Corporate
- Retail
- Analog
- Mitra

## 3. AdminBilling

Card:

- Kolektor Kwitansi
- Payment Customer

---

# Layout Height

- Baris summary: `auto-rows-[144px]`
- Baris customer segment: `auto-rows-[224px]`
- Baris billing/payment: `auto-rows-[360px]`

Tinggi card dikontrol oleh section grid. Component card memakai `h-full` agar mengikuti tinggi row.

---

# Status

Sudah ada:

- Page `AdminDashboard.vue`
- Section Admin
- Card title dan icon
- Dummy data awal
- Menu sidebar `Admin`
- KPI card dengan icon dan warna semantik Untitled UI
- Alert pelanggan isolir
- Indikator pelanggan baru, putus, dan outstanding per segmen
- Total segmen dan metode pembayaran direkonsiliasi ke total 8.261 pelanggan
- Tabel kolektor dengan badge penyelesaian
- Progress kwitansi dan metode pembayaran
- Reusable `DashboardPanelCard.vue`

## Visual

Dashboard Admin mengikuti tema light Untitled UI yang juga digunakan Dashboard Finance:

- Aksen utama brand `#7F56D9`.
- Warna success, info, warning, dan danger untuk status.
- Card memakai icon tile, accent strip, border lembut, dan shadow ringan.
- Alert memakai warna warning dan atribut `role="alert"`.
- Layout turun menjadi satu atau dua kolom pada mobile/tablet tanpa mengubah komposisi desktop.
- Integrasi sementara di `MainLayout.vue`

Belum ada:

- API integration
