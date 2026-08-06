# PINISI ERP Architecture

Version: 1.4

PINISI adalah frontend ERP berbasis Vue 3, TypeScript, Vite, Tailwind CSS, Lucide Icons, dan ApexCharts.

Dashboard yang sudah memiliki konten:

- Direksi
- Marketing
- Teknisi
- Admin
- Human Resource
- Finance
- NOC
- Operasional

---

# Application Flow

```text
index.html
-> src/main.ts
-> src/App.vue
-> src/layouts/MainLayout.vue
-> active dashboard component
```

Konfigurasi id, label, dan judul dashboard dipusatkan di:

```text
src/config/dashboard-navigation.ts
```

`MainLayout` memakai dynamic component dan `KeepAlive`. Vue Router belum aktif sehingga perpindahan dashboard belum mengubah URL.

---

# Dashboard Composition

```text
DirectorDashboard
-> DashboardSummary
-> DashboardAnalytics
-> DashboardInformation

MarketingDashboard
-> MarketingSummary
-> MarketingAnalytics
-> MarketingInformation

TeknisiDashboard
-> TeknisiSummary
-> TeknisiAnalytics
-> TeknisiOperations

AdminDashboard
-> AdminSummary
-> AdminCustomerSegments
-> AdminBilling

HumanResourceDashboard
-> HumanResourceSummary
-> HumanResourceAnalytics
-> HumanResourcePriorities

FinanceDashboard
-> FinanceSummary
-> FinanceAnalytics
-> FinanceTransactions

NocDashboard
-> NocSummary
-> NocMonitoring

OperationalDashboard
-> OperationalSummary
-> OperationalInventory
-> OperationalAlerts
```

---

# Responsibility

- `api/`: HTTP client dan konstanta endpoint.
- `config/`: konfigurasi aplikasi lintas komponen.
- `services/`: fungsi pengambilan data per modul.
- `types/`: kontrak TypeScript untuk API.
- `mock/`: data dummy sementara.
- `pages/`: komposisi halaman.
- `pages/*/sections/`: pengelompokan card dan data per area halaman.
- `components/`: reusable UI berbasis props.
- `layouts/`: kerangka aplikasi.

---

# Current Data Flow

```text
src/mock/dashboard/*
-> pages/*/sections/*
-> components (props)
-> UI
```

Dashboard Teknisi dan NOC memakai satu sumber mock bersama:

```text
src/mock/dashboard/technical-operations-dashboard.ts
```

Kapasitas internet Direksi dan NOC serta rincian kapasitas seluruh POP
dipusatkan di `src/mock/dashboard/internet-capacity.ts`. Total internet dihitung
dari agregasi data POP, bukan ditulis ulang pada masing-masing dashboard.

Dashboard Operasional memakai satu sumber inventaris:

```text
src/mock/dashboard/operational-dashboard.ts
```

Alert stok diturunkan dari data inventaris yang sama agar angka pada tabel dan
peringatan selalu konsisten.

Riwayat barang masuk dan keluar disimpan di `itemMovements` pada sumber
Operasional yang sama. Total card dihitung dari baris riwayat tersebut.

Metrik pelanggan yang dipakai lintas dashboard dipusatkan di:

```text
src/mock/dashboard/customer-metrics.ts
```

Sumber tersebut menetapkan periode pelanggan Agustus 2026 serta total Corporate
271, Retail 5.625, Mitra 1.945, dan Analog 420. Total lintas segmen menjadi
8.261.
Ringkasan Direksi, Marketing, Admin, metode pembayaran, distribusi Mitra,
target, tren, dan piutang Finance selalu diturunkan dari nilai numerik ini.
Kapasitas akuisisi Retail pada sumber yang sama menetapkan 35.000 Home Pass,
target 25.000 Home Connect, dan 10.000 port kosong.

Mutasi Corporate memakai periode YTD 2026, sedangkan mutasi Retail dan Mitra
memakai periode bulanan Agustus 2026. Seri Corporate pada
`CustomerGrowthChart` adalah
pendapatan, bukan jumlah pelanggan. Dataset popup Corporate dan Retail berada
di `customer-detail-data.ts`; masing-masing berisi sampel dummy 100 pelanggan
dan tidak dianggap sebagai seluruh populasi.

Data karyawan lintas dashboard dipusatkan di:

```text
src/mock/dashboard/employee-metrics.ts
```

Roster tersebut menjadi sumber total karyawan, kehadiran, pembagian divisi,
detail karyawan, dan anggota Tim Teknisi.

Data pergerakan keuangan Finance dan Direksi dipusatkan di:

```text
src/mock/dashboard/financial-metrics.ts
```

Finance menjadi acuan angka pemasukan dan pengeluaran. Kedua dashboard memakai
periode aktif Juli 2026 dan hanya memuat realisasi Januari-Juli. Data setelah
Juli tidak ditampilkan sampai tersedia penanda proyeksi yang eksplisit.

# Target Data Flow

```text
Backend
-> src/api/client.ts
-> src/services/dashboard.service.ts
-> page/store
-> sections
-> components (props)
-> UI
```

Seluruh endpoint dashboard dan response type sudah disiapkan. Integrasi UI ke service belum aktif.

---

# Responsive dan Accessibility

- Layout mempertahankan komposisi desktop dan turun menjadi satu/dua kolom pada tablet/mobile.
- Tabel lebar menggunakan horizontal scroll pada viewport kecil.
- Sidebar mobile memakai backdrop dan tombol kontrol yang memiliki atribut ARIA.
- Menu aktif memakai `aria-current`.
- Icon dekoratif disembunyikan dari accessibility tree.
- Tabel memiliki caption, heading kolom memakai `scope`, dan alert stok memiliki peran semantik.

---

# Visual System

- Palet, background, border, typography, dan focus ring mengikuti gaya Untitled UI.
- Semantic design token global berada di `src/style.css`.
- Panel reusable memakai radius `12px`, border `#EAECF0`, dan shadow ringan.
- Warna utama memakai `brand-600 #7F56D9`.
- Warna status memakai success `#079455`, info `#1570EF`,
  warning `#DC6803`, dan error `#D92D20`.
- Application shell menggunakan sidebar putih, active state brand-soft, serta
  lebar konten maksimum `1600px`.
