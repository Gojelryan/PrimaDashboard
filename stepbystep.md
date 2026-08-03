# Step By Step

Dokumen ini mencatat kondisi dan urutan pengembangan project PINISI ERP.

---

# Kondisi Saat Ini

Sudah ada:

- Vue 3 + TypeScript + Vite
- Tailwind CSS
- Lucide Icons
- ApexCharts
- Main layout
- Sidebar dan header
- Dashboard Direksi
- Dashboard Marketing
- Dashboard Teknisi
- Page Human Resource kosong
- Dashboard Admin
- Page Operational kosong
- Page Finance kosong
- Page NOC kosong
- Mock data per konten dashboard
- API client, endpoint constants, service, dan type contract awal

Belum ada:

- Vue Router aktif
- Pinia store
- Authentication
- Integrasi API aktif ke UI
- Testing setup
- Lint/format config

---

# Struktur Page Aktif

```text
src/pages/
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
|   `-- OperationalDashboard.vue
`-- teknisi/
    |-- TeknisiDashboard.vue
    `-- sections/
        |-- TeknisiAnalytics.vue
        |-- TeknisiOperations.vue
        `-- TeknisiSummary.vue
```

---

# Struktur Mock Aktif

```text
src/mock/
`-- dashboard/
    |-- admin-customer-segments.ts
    |-- admin-customer-status.ts
    |-- admin-payment-customers.ts
    |-- admin-receipt-collectors.ts
    |-- customer-growth.ts
    |-- customers-by-service.ts
    |-- financial-performance.ts
    |-- infrastructure-expansion.ts
    |-- internet-capacity.ts
    |-- marketing-branch-retail-partners.ts
    |-- marketing-customer-summary.ts
    |-- marketing-customers-by-service.ts
    |-- marketing-port-status.ts
    |-- marketing-target-performance.ts
    |-- network-health.ts
    |-- partner-distribution.ts
    |-- summary-cards.ts
    |-- teknisi-daily-installations.ts
    |-- teknisi-infrastructure-assets.ts
    |-- teknisi-infrastructure-built.ts
    |-- teknisi-material-stock.ts
    |-- teknisi-running-projects.ts
    |-- teknisi-team-performance.ts
    `-- teknisi-team-summary.ts
```

Ketentuan mock: hanya ada folder `src/mock/dashboard`. Dummy khusus modul memakai prefix modul, misalnya `admin-`, `marketing-`, dan `teknisi-`.

---

# Struktur Component Aktif

```text
src/components/
|-- cards/
|-- charts/
|-- header/
`-- sidebar/
```

Card marketing sudah berada di `src/components/cards`, bukan di folder page.

---

# Urutan Berikutnya

1. Rapikan atau hapus file template bawaan yang tidak dipakai.
2. Tambahkan router agar perpindahan dashboard tidak lagi memakai state lokal layout.
3. Tambahkan mapper dari API response ke props component.
4. Hubungkan service API secara bertahap setelah UI stabil.
5. Tambahkan loading, error, dan empty state.
6. Tambahkan testing dan lint/format config.
