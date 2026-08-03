# PINISI ERP

# Frontend Coding Standard

Version: 1.1

---

# General Rules

- Gunakan Bahasa Inggris untuk nama file, variabel, function, dan component.
- Gunakan Bahasa Indonesia hanya untuk teks yang tampil ke pengguna.
- Hindari singkatan yang tidak jelas.
- Gunakan nama yang deskriptif.

---

# Folder Naming

Semua folder menggunakan lowercase.

Contoh:

```text
components/
layouts/
services/
stores/
router/
assets/
mock/
utils/
```

---

# File Naming

## Vue Component

Gunakan PascalCase.

Contoh:

```text
SummaryCard.vue
MarketingDashboard.vue
DashboardSummary.vue
```

## TypeScript

Gunakan kebab-case.

Contoh:

```text
dashboard.service.ts
customer-growth.ts
target-performance.ts
financial-metrics.ts
```

## CSS

Gunakan lowercase atau kebab-case.

Contoh:

```text
style.css
dashboard.css
```

---

# Variable Naming

- Variable/function: camelCase.
- Type/interface/component name: PascalCase.
- Constant object: UPPER_SNAKE_CASE atau nama constant yang jelas.

Contoh:

```text
customerGrowth
totalCustomer
loadDashboard
DirectorDashboardResponse
API_ENDPOINTS
```

---

# Folder Responsibility

- `api/`: HTTP client dan endpoint constants.
- `services/`: fungsi data berdasarkan modul.
- `types/`: TypeScript type/interface.
- `mock/`: data dummy sementara.
- `components/`: reusable component.
- `pages/`: halaman.
- `pages/*/sections/`: komposisi bagian halaman.
- `layouts/`: kerangka aplikasi.
- `router/`: konfigurasi routing.
- `stores/`: global state.
- `utils/`: helper umum.

---

# Component Rules

Component dibuat apabila:

- Digunakan lebih dari satu kali, atau siap dipakai lintas page.
- Memiliki fungsi tampilan yang sama.
- Hanya data yang berubah.
- Tidak mengambil data backend secara langsung.

---

# Page Rules

- Satu file page mewakili satu halaman.
- Page menyusun section.
- Detail layout card berada di section atau reusable component.

---

# Section Rules

- Section mengelompokkan beberapa component.
- Section boleh mengambil mock data sementara.
- Saat integrasi backend, data section sebaiknya berasal dari page/service/store.

---

# Service Rules

- Service mengambil data dari API.
- Service tidak menyentuh HTML, CSS, atau DOM.
- Service tidak berisi state UI.

---

# Current Notes

- Vue Router belum aktif.
- Pinia belum aktif.
- UI masih memakai mock data.
- API foundation sudah tersedia di `src/api`, `src/services`, dan `src/types`.
