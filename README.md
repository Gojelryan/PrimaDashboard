# PINISI ERP

PINISI ERP adalah frontend dashboard terpadu untuk Direksi, Marketing,
Finance, Teknisi, NOC, Admin, Human Resource, dan Operasional. Aplikasi saat ini
berfokus pada penyajian antarmuka responsif menggunakan data mock lokal.
Fondasi komunikasi API sudah tersedia, tetapi belum dihubungkan ke halaman.

README ini merupakan dokumentasi utama dan satu-satunya untuk proyek.

## Status saat ini

Sudah tersedia:

- Delapan dashboard dengan konten dan layout responsif.
- Application shell dengan sidebar desktop/mobile dan header.
- Preferensi tema System, Light, dan Dark yang disimpan di `localStorage`.
- Semantic design token terpusat di `src/style.css`.
- Reusable card, chart, tabel, detail modal, visual data state, dan kontrol interaktif.
- Data mock lintas dashboard yang dikonsolidasikan per domain.
- Formatter angka, persentase, dan Rupiah.
- HTTP client, konstanta endpoint, dashboard service, dan kontrak TypeScript.
- ESLint, typecheck, Vitest, production build, dan GitHub Actions CI.
- Accessibility dasar seperti focus state, ARIA navigation, semantic table,
  modal keyboard handling, dan reduced motion.

Belum tersedia:

- Vue Router dan URL unik untuk setiap dashboard.
- Integrasi API aktif ke halaman.
- Authentication dan authorization berbasis role.
- Global state management seperti Pinia.
- Loading, empty, stale, dan error state untuk data backend.
- Runtime validation untuk response API.

## Tech stack

- Vue 3 dengan Composition API dan `<script setup>`
- TypeScript
- Vite
- Tailwind CSS 4
- ApexCharts dan vue3-apexcharts
- Lucide Vue Next
- Vitest, Vue Test Utils, dan jsdom
- ESLint
- GitHub Actions

## Prasyarat

- Node.js `>=22.12.0`
- npm yang kompatibel dengan versi Node.js tersebut

## Menjalankan proyek

```bash
npm ci
npm run dev
```

Vite akan menampilkan alamat development server pada terminal.

Perintah yang tersedia:

```bash
npm run dev          # development server
npm run typecheck    # pemeriksaan TypeScript
npm run lint         # pemeriksaan ESLint tanpa warning
npm run lint:fix     # perbaikan lint yang dapat dilakukan otomatis
npm test             # menjalankan seluruh test sekali
npm run test:watch   # menjalankan test dalam watch mode
npm run build        # typecheck dan production build
npm run preview      # preview hasil production build
```

Sebelum menyerahkan perubahan, jalankan minimal:

```bash
npm run lint
npm test
npm run build
```

## Konfigurasi API

Secara default, request menggunakan origin aplikasi. Untuk backend pada origin
berbeda, buat `.env.local`:

```dotenv
VITE_API_BASE_URL=https://api.example.com
```

Endpoint dashboard berada di `src/api/endpoints.ts`, HTTP client berada di
`src/api/client.ts`, dan fungsi pengambilan data berada di
`src/services/dashboard.service.ts`.

Endpoint yang telah disiapkan:

| Dashboard | Endpoint |
| --- | --- |
| Direksi | `/api/dashboard/director` |
| Marketing | `/api/dashboard/marketing` |
| Teknisi | `/api/dashboard/technician` |
| Admin | `/api/dashboard/admin` |
| Human Resource | `/api/dashboard/human-resource` |
| Operasional | `/api/dashboard/operational` |
| Finance | `/api/dashboard/finance` |
| NOC | `/api/dashboard/noc` |

## Struktur proyek

```text
pinisi/
|-- .github/workflows/       # continuous integration
|-- backup/                  # snapshot lokal setelah perubahan
|-- public/                  # aset publik
|-- src/
|   |-- api/                 # HTTP client dan endpoint
|   |-- assets/              # logo dan aset aplikasi
|   |-- components/
|   |   |-- cards/           # reusable card dan panel
|   |   |-- charts/          # wrapper dan konfigurasi chart
|   |   |-- header/          # application header
|   |   |-- modals/          # detail table modal
|   |   |-- sidebar/         # navigasi dashboard
|   |   `-- ui/              # loading, empty, error, dan stale state
|   |-- config/              # konfigurasi navigasi
|   |-- layouts/             # application shell
|   |-- mock/dashboard/      # data dummy per domain
|   |-- pages/               # dashboard dan section per modul
|   |-- services/            # fungsi pengambilan data
|   |-- types/               # kontrak TypeScript
|   |-- utils/               # formatter dan utility bersama
|   |-- App.vue
|   |-- main.ts
|   `-- style.css
|-- index.html
|-- package.json
|-- tsconfig.json
|-- vite.config.ts
`-- vitest.config.ts
```

Folder `src/router`, `src/stores`, serta beberapa subfolder komponen masih
disiapkan sebagai placeholder dan belum berisi implementasi aktif.

## Komposisi dashboard

| Dashboard | Section utama |
| --- | --- |
| Direksi | Summary, analytics, information |
| Marketing | Summary, analytics, information |
| Finance | Summary, analytics, transactions |
| Teknisi | Summary, analytics, operations |
| NOC | Summary, monitoring |
| Admin | Summary, customer segments, billing |
| Human Resource | Summary, analytics, priorities |
| Operasional | Summary, inventory, alerts |

Navigasi dashboard dipusatkan di `src/config/dashboard-navigation.ts`.
`MainLayout` memilih dashboard melalui dynamic component dan mempertahankan
state komponen dengan `KeepAlive`. Karena Vue Router belum aktif, perpindahan
dashboard belum mengubah URL dan pilihan dashboard akan kembali ke Direksi
setelah halaman dimuat ulang.

## Alur data

Alur data aktif:

```text
src/mock/dashboard/*
-> pages/*/sections/*
-> reusable components melalui props
-> UI
```

Section boleh mengambil mock sementara. Komponen reusable dan chart tidak
mengambil mock atau backend secara langsung.

Target alur data setelah backend aktif:

```text
Backend
-> src/api/client.ts
-> src/services/dashboard.service.ts
-> page atau store
-> sections
-> components
-> UI
```

Beberapa domain dipakai bersama agar angka antardashboard tetap konsisten,
termasuk metrik pelanggan, karyawan, operasi teknis, performa komersial,
kapasitas internet, dan pergerakan keuangan.

## UI dan styling

- Palet, surface, border, shadow, dan warna status memakai CSS custom properties
  di `src/style.css`.
- Tipografi memakai system font stack lokal yang eksplisit melalui
  `--font-sans`; aplikasi tidak bergantung pada unduhan font eksternal.
- Warna brand utama adalah ungu; success, warning, error, dan info memakai token
  semantik terpisah.
- Card utama menggunakan radius 12px, border netral, dan shadow ringan.
- Sidebar memakai surface gelap pada light maupun dark theme.
- Layout konten memiliki lebar maksimum 1600px.
- Grid turun menjadi satu atau dua kolom pada viewport yang lebih kecil.
- Panel chart menggunakan responsive `clamp()` dan konten lain mengikuti tinggi
  alaminya, bukan kumpulan fixed height per breakpoint.
- Tabel lebar menggunakan horizontal scroll.
- Format angka, unit, persentase, Rupiah, dan angka ringkas dipusatkan di
  `src/utils/dashboard-formatters.ts` dengan locale `id-ID`.
- KPI utama menggunakan card prominent, panel analitik memakai hierarchy
  default, dan informasi pendukung memakai surface subtle.
- Tema `System` mengikuti perubahan preferensi sistem secara langsung. Script
  bootstrap di `index.html` menerapkan tema sebelum Vue dirender agar tidak
  terjadi kilatan tema terang saat preferensi pengguna adalah gelap.

Visual state reusable tersedia di:

- `src/components/ui/LoadingState.vue`
- `src/components/ui/EmptyState.vue`
- `src/components/ui/ErrorState.vue`
- `src/components/ui/StaleDataNotice.vue`

Seluruh state diekspor melalui `src/components/ui/index.ts` dan siap dipakai
ketika integrasi API diaktifkan.

## Pengujian dan kualitas

Test berada berdampingan dengan source menggunakan pola `src/**/*.test.ts`.
Cakupan aktif meliputi:

- Konfigurasi dan keunikan navigasi dashboard.
- Interaksi sidebar.
- Pencarian, sorting, pagination, dan row action pada modal detail.
- Rekonsiliasi data pelanggan dan karyawan lintas dashboard.
- Konsistensi operasi teknis, kapasitas POP, lembur, cuti, dan performa komersial.
- Konsistensi formatter angka, mata uang, persentase, dan unit.

Workflow CI di `.github/workflows/ci.yml` menjalankan instalasi dependency,
lint, test, dan production build pada push ke `main` serta pull request.

## Aturan pengembangan

- Gunakan TypeScript dan hindari `any` tanpa alasan yang jelas.
- Page hanya menyusun section; section mengatur data dan komposisi tampilan.
- Komponen reusable menerima data melalui props dan tidak memanggil API langsung.
- Simpan seluruh data dummy dashboard di `src/mock/dashboard`.
- Gunakan semantic design token, bukan warna hardcoded di komponen.
- Gunakan formatter bersama untuk angka, persentase, dan mata uang.
- Tambahkan atau perbarui test ketika mengubah logika data dan interaksi penting.
- Jalankan lint, test, dan build sebelum merge.
- Buat snapshot file yang diubah di folder `backup` sesuai aturan proyek.

## Prioritas pengembangan

1. Tambahkan Vue Router dan lazy loading per dashboard.
2. Integrasikan service API secara bertahap dengan mapper response.
3. Tambahkan authentication dan authorization berbasis role.
4. Hubungkan loading, empty, stale, dan error state ke alur API setiap dashboard.
5. Perluas test untuk layout utama, theme, API client, dan setiap dashboard.
6. Perbaiki accessibility sidebar mobile dan focus trap modal.
7. Pisahkan warna chart kategorikal dari warna status semantik.
