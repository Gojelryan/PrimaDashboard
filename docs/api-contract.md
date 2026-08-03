# API Contract

Dokumen ini menjadi acuan awal komunikasi frontend dan backend untuk seluruh dashboard.

Status saat ini:

- UI masih memakai mock data lokal.
- API belum diintegrasikan ke halaman.
- HTTP client, endpoint, service, dan kontrak TypeScript seluruh modul sudah tersedia.
- Backend mengirim nilai numerik mentah; formatting rupiah, angka, persen, dan unit dilakukan frontend.

---

# Konvensi Umum

Semua endpoint memakai method `GET` dan mengembalikan:

```text
period
updatedAt (opsional)
data dashboard sesuai modul
```

Format periode:

```json
{
  "year": 2026,
  "month": 7,
  "label": "Juli 2026"
}
```

Status yang didukung:

- `200` Success
- `400` Bad Request
- `401` Unauthorized
- `404` Not Found
- `500` Internal Server Error

---

# Endpoint Dashboard

| Modul | Endpoint | Response Type |
|---|---|---|
| Direksi | `/api/dashboard/director` | `DirectorDashboardResponse` |
| Marketing | `/api/dashboard/marketing` | `MarketingDashboardResponse` |
| Teknisi | `/api/dashboard/technician` | `TechnicianDashboardResponse` |
| Admin | `/api/dashboard/admin` | `AdminDashboardResponse` |
| Human Resource | `/api/dashboard/human-resource` | `HumanResourceDashboardResponse` |
| Operasional | `/api/dashboard/operational` | `OperationalDashboardResponse` |
| Finance | `/api/dashboard/finance` | `FinanceDashboardResponse` |
| NOC | `/api/dashboard/noc` | `NocDashboardResponse` |

Konstanta endpoint berada di `src/api/endpoints.ts` dan pemanggilan API berada di `src/services/dashboard.service.ts`.

---

# Field per Modul

## Direksi

- `summary`
- `financial`
- `customers`
- `infrastructure`
- `internetCapacity`
- `networkHealth`
- `partners`

`financial` memakai bentuk `FinancialMovementData` yang sama dengan
`Finance.monthlyCashFlow`: berisi `selectedMonth` dan `monthly[]`. Setiap titik
bulanan berisi `month`, `label`, `income`, dan `expense`.

## Marketing

- `customerSegments`
- `targets`
- `branchRetailPartners`
- `portStatus`
- `customersByService`
- `growth.corporateRevenue`
- `growth.retailCustomers`
- `growth.partnerCustomers`

Data Corporate pada grafik merupakan pendapatan dalam rupiah. Data Retail
internal dan pelanggan Mitra merupakan jumlah pelanggan dan tetap menjadi seri
terpisah.

`branchRetailPartners` memuat `totalPartner`, `totalCustomer`, serta pembagian
`partner` dan `customer` per wilayah. Dashboard Marketing dan Direksi memakai
sumber distribusi mitra yang sama.

## Teknisi

- `team`
- `jobs`
- `dailyInstallations`
- `runningProjects`
- `teamPerformance`
- `materialStock`
- `infrastructureAssets`
- `infrastructureBuilt`

`teamPerformance.foWithdrawalMeters` menggunakan satuan meter.

## Admin

- `customerStatus`
- `customerSegments`
- `receipts.categories`
- `receipts.collectors`
- `payments`

## Human Resource

- `employees.total`
- `employees.attendance`
- `employees.divisions`
- `overtime.employees`
- `overtime.divisions`
- `leaveRequests`
- `priorities`
- `payroll`

Setiap item `overtime.employees[]` memuat `name`, total `hours`, dan `details[]`.
Detail lembur memuat `id`, `date`, `startTime`, `endTime`, `hours`,
`description`, serta `status` (`approved`, `pending`, atau `rejected`).

Setiap `leaveRequests[]` memuat identitas pemohon, jenis dan periode cuti,
jumlah hari, alasan, `directSupervisor`, `hrApproval`, serta status proses.
Persetujuan HR tetap `pending` sampai atasan langsung menyetujui pengajuan.

## Operasional

- `summary.incomingItems`
- `summary.outgoingItems`
- `summary.itemRequests`
- `summary.pendingRequests`
- `inventory[].item`
- `inventory[].unit`
- `inventory[].quantity`
- `inventory[].used`
- `inventory[].warehouse`
- `inventory[].good`
- `inventory[].damaged`
- `inventory[].minimumStock`
- `vehicles.total`
- `vehicles.standby`
- `vehicles.onsite`
- `vehicles.service`

Konsistensi inventaris:

- `quantity = used + warehouse`
- `warehouse = good + damaged`
- Barang habis diturunkan dari `warehouse === 0`.
- Barang hampir habis diturunkan dari `0 < warehouse < minimumStock`.

## Finance

- `cash`
- `monthlyCashFlow`
- `receivables`
- `payables`
- `opex`
- `recentExpenses`
- `invoices`

`monthlyCashFlow` memakai bentuk `FinancialMovementData` yang sama dengan
`Direksi.financial`. Periode realisasi aktif saat ini adalah Juli 2026. Bulan
setelah periode tersebut tidak dikirim sebagai realisasi; data proyeksi harus
memiliki kontrak dan penanda terpisah.

## NOC

- `tickets`
- `incidentSummary`
- `internetCapacity`
- `serviceAlarms`
- `latencyResponses`
- `incidentCategories`
- `incidentHistory`
- `popCapacity`

`serviceAlarms[].occurredAt` memakai waktu ISO 8601 dan menunjukkan waktu
gangguan atau informasi layanan terjadi. Formatting jam dan zona waktu dilakukan
oleh frontend; card NOC saat ini menampilkannya dalam WITA.

Mock frontend Teknisi dan NOC dikonsolidasikan di
`src/mock/dashboard/technical-operations-dashboard.ts`.

---

# Aturan Integrasi

- Component presentasional tidak memanggil API langsung.
- Page atau section menerima data dari service/store.
- API mengirim angka mentah, bukan string seperti `Rp 2,1M`.
- Persentase dikirim sebagai angka, misalnya `34`, bukan string `34%`.
- Tanggal API memakai ISO 8601.
- Total turunan dan persentase harus konsisten dengan data detail.
- Error API ditangani melalui `ApiError` dari `src/api/client.ts`.
