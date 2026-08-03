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

Daftar lembur karyawan menampilkan total jam per karyawan. Aksi `Lihat detail
lembur` membuka rincian tanggal, jam mulai dan selesai, durasi, keterangan
pekerjaan, serta status verifikasi.

Chart lembur divisi menggunakan `HumanResourceOvertimeChart.vue` dan menerima data melalui props.

Status `Cuti` pada detail karyawan hanya menunjukkan status kehadiran.
Pengajuan yang masih berjalan dapat dilihat dari card `Prioritas Human
Resource`, pada baris `Pengajuan Cuti menunggu`, lalu memilih `Lihat
pengajuan`. Detail menampilkan pemohon, periode, alasan, atasan langsung,
persetujuan atasan, persetujuan HR, dan status proses.

Alur persetujuan cuti saat ini:

```text
Karyawan mengajukan
-> Atasan langsung menyetujui/menolak
-> HR menyetujui/menolak
-> Status akhir
```

Layout menggunakan satu kolom pada mobile, dua kolom bila ruang memungkinkan, dan komposisi penuh pada desktop.
