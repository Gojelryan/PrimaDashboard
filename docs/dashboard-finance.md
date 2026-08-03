# Dashboard Finance

Dashboard Finance menampilkan total kas, cash flow, piutang, hutang, Opex, pengeluaran terakhir, dan invoice.

Komposisi:

```text
FinanceDashboard.vue
-> sections/FinanceSummary.vue
-> sections/FinanceAnalytics.vue
-> sections/FinanceTransactions.vue
```

Mock data:

```text
src/mock/dashboard/finance-dashboard.ts
src/mock/dashboard/financial-metrics.ts
```

Chart:

- `RevenueChart.vue`
- `FinanceOpexChart.vue`

`financial-metrics.ts` menjadi sumber bersama Pergerakan Keuangan Finance dan
Direksi. Periode aktif adalah Juli 2026 dan data aktual hanya Januari-Juli.
Kedua chart menerima data melalui props. Tabel transaksi memakai horizontal scroll pada mobile dan tablet sempit.

## Visual

UI Finance mengikuti karakter visual Untitled UI light dashboard:

- Aksen utama brand `#7F56D9`.
- Warna semantik success, info, warning, dan danger.
- KPI card memakai icon tile dan garis aksen.
- Hutang jatuh tempo memakai warning alert.
- Pengeluaran memakai icon berdasarkan kategori.
- Invoice memakai status badge `Lunas`, `Diproses`, dan `Jatuh Tempo`.
- Panel Finance memakai reusable `DashboardPanelCard.vue`.
