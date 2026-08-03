# Dashboard Human Resource

Dashboard Human Resource menampilkan ringkasan karyawan, lembur, prioritas HR, dan payroll.

Komposisi:

```text
HumanResourceDashboard.vue
-> sections/HumanResourceSummary.vue
-> sections/HumanResourceAnalytics.vue
-> sections/HumanResourcePriorities.vue
```

Mock data:

```text
src/mock/dashboard/employee-metrics.ts
-> src/mock/dashboard/human-resource-dashboard.ts
```

Roster bersama menjadi sumber total, kehadiran, pembagian divisi, dan tabel
detail karyawan. Total pada card tidak ditulis ulang secara manual.

Chart lembur divisi menggunakan `HumanResourceOvertimeChart.vue` dan menerima data melalui props.

Layout menggunakan satu kolom pada mobile, dua kolom bila ruang memungkinkan, dan komposisi penuh pada desktop.
