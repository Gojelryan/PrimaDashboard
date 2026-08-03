# Dashboard Operasional

Dashboard Operasional menerapkan layout inventaris dengan visual Untitled UI dan
dummy data lokal yang sesuai kontrak `OperationalDashboardResponse`.

## Struktur

```text
OperationalDashboard
|-- OperationalSummary
|-- OperationalInventory
`-- OperationalAlerts
```

## Konten

- Ringkasan barang masuk, barang keluar, dan permintaan barang.
- Modal riwayat barang masuk dan barang keluar dengan pencarian transaksi.
- Inventaris dengan qty, pemakaian, serta sisa gudang.
- Kondisi stok gudang baik dan rusak.
- Alert barang habis dan hampir habis.
- Kondisi kendaraan standby, on site, dan service.

## Sumber Data

Seluruh tampilan memakai `src/mock/dashboard/operational-dashboard.ts`.
Angka disimpan sebagai nilai numerik mentah dan diformat pada UI.

Nilai ringkasan barang masuk dan keluar dihitung dari total kuantitas pada
`itemMovements.incoming` dan `itemMovements.outgoing`, sehingga card dan tabel
riwayat selalu menggunakan sumber dummy yang sama.

Aturan konsistensi:

```text
quantity = used + warehouse
warehouse = good + damaged
```

Alert tidak memiliki daftar mock terpisah. Daftar barang habis dan hampir habis
diturunkan langsung dari `warehouse` dan `minimumStock`.

## Responsive dan Accessibility

- KPI berubah dari tiga kolom menjadi satu/dua kolom pada viewport kecil.
- Tabel menggunakan horizontal scroll tanpa menghilangkan kolom.
- Tabel memiliki caption dan heading kolom semantik.
- Alert persediaan memakai `role="alert"`.
- Icon dekoratif memakai `aria-hidden`.
