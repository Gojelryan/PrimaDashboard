# PINISI ERP

# Folder Standard

Version: 1.2

---

# Tujuan

Dokumen ini menjelaskan fungsi setiap folder agar file ditempatkan sesuai tanggung jawabnya.

---

# Root Folder Saat Ini

```text
pinisi/
|-- .agents/
|-- .vscode/
|-- backup-*/
|-- docs/
|-- node_modules/
|-- public/
|-- src/
|-- .gitignore
|-- index.html
|-- package.json
|-- package-lock.json
|-- README.md
|-- stepbystep.md
|-- tsconfig.app.json
|-- tsconfig.json
|-- tsconfig.node.json
`-- vite.config.ts
```

Catatan:

- `backup-*/`, `dist/`, dan `node_modules/` tidak dianggap source aktif.
- Source aplikasi berada di `src/`.
- Dokumentasi project berada di `docs/`.

---

# docs/

File aktif:

- `api-contract.md`
- `architecture.md`
- `coding-standard.md`
- `component-map.md`
- `components.md`
- `dashboard-admin.md`
- `dashboard-director.md`
- `dashboard-marketing.md`
- `dashboard-operational.md`
- `dashboard-teknisi.md`
- `folder-standard.md`
- `ui-theme.md`

---

# src/ Saat Ini

```text
src/
|-- api/
|   |-- client.ts
|   `-- endpoints.ts
|-- assets/
|-- config/
|-- components/
|   |-- cards/
|   |-- charts/
|   |-- common/
|   |-- header/
|   |-- sidebar/
|   |-- tables/
|   |-- ui/
|   `-- widget/
|-- layouts/
|-- mock/
|   `-- dashboard/
|-- pages/
|   |-- admin/
|   |   `-- sections/
|   |-- director/
|   |   `-- sections/
|   |-- finance/
|   |   `-- sections/
|   |-- human-resource/
|   |   `-- sections/
|   |-- marketing/
|   |   `-- sections/
|   |-- noc/
|   |-- operational/
|   `-- teknisi/
|       `-- sections/
|-- router/
|-- services/
|-- stores/
|-- types/
|-- utils/
|-- App.vue
|-- main.ts
`-- style.css
```

---

# Folder Rules

## src/api/

Untuk komunikasi HTTP tingkat rendah.

File aktif:

- `client.ts`
- `endpoints.ts`

Tidak boleh berisi UI, component, atau mock data.

## src/services/

Untuk fungsi data berdasarkan modul.

File aktif:

- `dashboard.service.ts`

Service boleh memanggil `src/api/`, tetapi tidak boleh memanipulasi DOM atau CSS.

## src/types/

Untuk TypeScript type/interface lintas folder.

File aktif:

- `dashboard.ts`

## src/components/

Untuk reusable component.

Subfolder aktif:

- `cards/`
- `charts/`
- `header/`
- `sidebar/`

Komponen yang reusable lintas page diletakkan di sini, bukan di dalam folder page.

## src/pages/

Untuk halaman utama.

```text
pages/
|-- admin/
|   |-- AdminDashboard.vue
|   `-- sections/
|       |-- AdminBilling.vue
|       |-- AdminCustomerSegments.vue
|       `-- AdminSummary.vue
|-- director/
|   |-- DirectorDashboard.vue
|   `-- sections/
|       |-- DashboardAnalytics.vue
|       |-- DashboardInformation.vue
|       `-- DashboardSummary.vue
|-- finance/
|   `-- FinanceDashboard.vue
|-- human-resource/
|   `-- HumanResourceDashboard.vue
|-- marketing/
|   |-- MarketingDashboard.vue
|   `-- sections/
|       |-- MarketingAnalytics.vue
|       |-- MarketingInformation.vue
|       `-- MarketingSummary.vue
|-- noc/
|   `-- NocDashboard.vue
|-- operational/
|   |-- OperationalDashboard.vue
|   `-- sections/
`-- teknisi/
    |-- TeknisiDashboard.vue
    `-- sections/
        |-- TeknisiAnalytics.vue
        |-- TeknisiOperations.vue
        `-- TeknisiSummary.vue
```

Page hanya menyusun section. Section mengatur komposisi data dan component.

## src/mock/

Untuk data sementara sebelum API aktif.

```text
mock/
`-- dashboard/
    |-- admin-customer-segments.ts
    |-- admin-customer-status.ts
    |-- admin-payment-customers.ts
    |-- admin-receipt-collectors.ts
    |-- customer-detail-data.ts
    |-- customer-growth.ts
    |-- customer-metrics.ts
    |-- customers-by-service.ts
    |-- financial-metrics.ts
    |-- infrastructure-expansion.ts
    |-- internet-capacity.ts
    |-- marketing-branch-retail-partners.ts
    |-- marketing-customer-summary.ts
    |-- marketing-customers-by-service.ts
    |-- marketing-port-status.ts
    |-- marketing-target-performance.ts
    |-- network-health.ts
    |-- partner-distribution.ts
    |-- operational-dashboard.ts
    |-- summary-cards.ts
    `-- technical-operations-dashboard.ts
```

Semua dummy dashboard berada di `src/mock/dashboard`.

Data yang saling berhubungan antara Dashboard Teknisi dan NOC ditempatkan
dalam `technical-operations-dashboard.ts` agar tidak terjadi duplikasi sumber.

Ketentuan file dummy:

- Satu file mewakili satu domain data.
- Jangan membuat folder mock lain selain `dashboard`.
- File dummy umum/director boleh memakai nama domain langsung, contoh `summary-cards.ts`.
- File dummy khusus modul lain wajib memakai prefix modul, contoh
  `admin-customer-status.ts` atau `marketing-target-performance.ts`.
- Data lintas dashboard yang berada dalam satu domain boleh dikonsolidasikan,
  seperti data Teknisi dan NOC pada `technical-operations-dashboard.ts`.

---

# Naming Rules Aktif

- Vue component: PascalCase, contoh `SummaryCard.vue`.
- TypeScript file: kebab-case, contoh `dashboard.service.ts`, `customer-growth.ts`.
- Folder: lowercase.
- Variable/function: camelCase.
- Constant object: UPPER_SNAKE_CASE atau named constant yang jelas.

---

# Data Flow Saat Ini

```text
Mock Data
-> Section
-> Component
-> User
```

---

# Data Flow Target

```text
Backend
-> API
-> Service
-> Store optional
-> Page
-> Section
-> Component
-> User
```
