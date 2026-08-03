# Dashboard NOC

Dashboard NOC digunakan untuk memantau ticket, gangguan jaringan, kapasitas
internet, kesehatan jaringan, alarm layanan, latency endpoint, riwayat
gangguan, dan utilisasi POP.

Komposisi:

```text
NocDashboard.vue
-> sections/NocSummary.vue
-> sections/NocMonitoring.vue
```

Mock data:

```text
src/mock/dashboard/technical-operations-dashboard.ts
```

Chart gangguan menggunakan `NocIncidentChart.vue` dan menerima data melalui props.
Total gangguan selalu ditampilkan di tengah donut dan tidak berubah saat
pengguna melakukan hover pada kategori.

Card Alarm Layanan menampilkan waktu terjadinya gangguan atau informasi dari
`serviceAlarms[].occurredAt`, bukan nilai dampak bandwidth. Mock menyimpan waktu
dalam ISO 8601 dan UI memformatnya sebagai jam WITA.

Data NOC dan Teknisi memakai satu sumber bersama agar informasi POP,
infrastruktur, dan operasi teknis tidak memiliki sumber ganda.

Card Kapasitas Internet memakai `NetworkCapacityCard` yang sama dengan dashboard
Direksi. Pola visual NOC menjadi acuan dan data dikirim sebagai angka mentah
dalam Gbps.

Card Kesehatan Jaringan ditempatkan di bawah Riwayat Gangguan dan memakai
`InformationListCard` serta sumber `network-health.ts` yang sama dengan Direksi.

## Responsive

- Summary tampil satu kolom di mobile, dua kolom di tablet, dan empat kolom di desktop.
- Area monitoring turun menjadi satu kolom sebelum breakpoint desktop.
- Daftar latency dan kapasitas POP menggunakan internal scroll agar card tetap terkendali.

## Visual

Dashboard memakai tema light Untitled UI:

- Ungu sebagai warna utama.
- Success untuk kondisi normal.
- Warning untuk latency/utilisasi yang perlu perhatian.
- Danger untuk latency tinggi, alarm kritis, dan utilisasi POP kritis.
- Icon tile, accent strip, badge status, dan panel shadow lembut.
