# PINISI ERP

PINISI ERP adalah aplikasi frontend berbasis Vue 3, TypeScript, Vite, Tailwind CSS, Lucide Icons, dan ApexCharts.

Project saat ini berfokus pada dashboard berbasis mock data lokal. Seluruh dashboard—Direksi, Marketing, Teknisi, Admin, Human Resource, Finance, NOC, dan Operasional—sudah memiliki konten serta memakai fondasi visual Untitled UI yang konsisten. API layer sudah disiapkan, sedangkan UI aktif masih memakai mock data.

---

# Tech Stack

- Vue 3
- TypeScript
- Vite
- Tailwind CSS
- ApexCharts
- vue3-apexcharts
- lucide-vue-next

---

# Script

```bash
npm run dev
npm run build
npm run preview
```

---

# Struktur Aktif

```text
pinisi/
|-- docs/
|-- public/
|-- src/
|-- backup-*/
|-- index.html
|-- package.json
|-- package-lock.json
|-- tsconfig.json
|-- tsconfig.app.json
|-- tsconfig.node.json
|-- vite.config.ts
|-- stepbystep.md
`-- README.md
```

Catatan:

- `node_modules/` adalah dependency hasil instalasi dan bukan source aktif.
- `dist/` adalah output build dan bukan source aktif.
- `backup-*/` adalah backup lokal project.

---

# Alur Aplikasi Saat Ini

```text
index.html
-> src/main.ts
-> src/App.vue
-> src/layouts/MainLayout.vue
-> src/config/dashboard-navigation.ts
-> active dashboard page
```

`MainLayout.vue` saat ini mengatur perpindahan sementara antara delapan dashboard:

- `src/pages/director/DirectorDashboard.vue`
- `src/pages/marketing/MarketingDashboard.vue`
- `src/pages/teknisi/TeknisiDashboard.vue`
- `src/pages/admin/AdminDashboard.vue`
- `src/pages/human-resource/HumanResourceDashboard.vue`
- `src/pages/operational/OperationalDashboard.vue`
- `src/pages/finance/FinanceDashboard.vue`
- `src/pages/noc/NocDashboard.vue`

Vue Router belum aktif. Navigasi memakai konfigurasi terpusat, dynamic component, dan `KeepAlive`.

---

# Status

Sudah ada:

- Layout utama
- Sidebar
- Header
- Dashboard Direksi
- Dashboard Marketing
- Dashboard Teknisi
- Dashboard Admin
- Dashboard Human Resource dengan ringkasan karyawan, lembur, prioritas, dan payroll
- Dashboard Finance dengan kas, cash flow, piutang, hutang, opex, pengeluaran, dan invoice
- Dashboard NOC dengan ticket, gangguan, latency, alarm layanan, dan kapasitas POP
- Dashboard Operasional dengan arus barang, inventaris, kondisi gudang, alert stok, dan kendaraan
- Tema Untitled UI terpusat melalui semantic design token di `src/style.css`
- Reusable cards
- Chart components berbasis props
- Mock data per modul
- API client, endpoint constants, service, dan type contract awal
- Kontrak API untuk delapan dashboard
- Responsive layout untuk desktop, tablet, dan mobile
- Accessibility dasar pada navigasi dan kontrol interaktif

Belum ada:

- Vue Router aktif
- Pinia store
- Integrasi API aktif ke UI
- Authentication
- Testing setup
- Lint/format config

---

# Pola Data Komponen

Section dashboard mengimpor mock data, lalu meneruskannya ke reusable component melalui props. Komponen chart tidak mengambil mock atau data backend secara langsung.

Contoh:

```vue
<RevenueChart :data="financialPerformance" />

<CustomerGrowthChart :data="customerGrowth" />

<DonutPartnerChart :data="partnerDistribution" />

<TechnicianDailyInstallationChart
  :categories="teknisiDailyInstallations.categories"
  :series="teknisiDailyInstallations.series"
/>
```
