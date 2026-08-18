<script setup lang="ts">
import { ref } from 'vue'
import { ClipboardList, PackageMinus, PackagePlus } from 'lucide-vue-next'

import BaseCard from '../../../components/cards/BaseCard.vue'
import CardHeader from '../../../components/cards/CardHeader.vue'
import DetailAction from '../../../components/cards/DetailAction.vue'
import DetailTableModal from '../../../components/modals/DetailTableModal.vue'
import { operationalDashboard } from '../../../mock/dashboard/operational-dashboard'
import { operationalItemRequestDetails } from '../../../mock/dashboard/priority-detail-data'
import { formatNumber } from '../../../utils/dashboard-formatters'

const activeDetail = ref<'incoming' | 'outgoing' | 'request' | null>(null)

const movementDateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
  timeZone: 'Asia/Makassar'
})

const incomingColumns = [
  { key: 'id', label: 'Nomor Transaksi' },
  { key: 'occurredAt', label: 'Tanggal & Waktu' },
  { key: 'item', label: 'Barang' },
  { key: 'quantity', label: 'Jumlah', align: 'right' as const },
  { key: 'unit', label: 'Satuan' },
  { key: 'counterparty', label: 'Supplier' },
  { key: 'document', label: 'Dokumen' },
  { key: 'officer', label: 'Petugas' },
  { key: 'status', label: 'Status', type: 'badge' as const }
]

const outgoingColumns = [
  { key: 'id', label: 'Nomor Transaksi' },
  { key: 'occurredAt', label: 'Tanggal & Waktu' },
  { key: 'item', label: 'Barang' },
  { key: 'quantity', label: 'Jumlah', align: 'right' as const },
  { key: 'unit', label: 'Satuan' },
  { key: 'counterparty', label: 'Tujuan' },
  { key: 'document', label: 'Dokumen' },
  { key: 'officer', label: 'Petugas' },
  { key: 'status', label: 'Status', type: 'badge' as const }
]

function formatMovementRows(
  movements: typeof operationalDashboard.itemMovements.incoming
) {
  return movements.map(movement => ({
    ...movement,
    occurredAt: `${movementDateFormatter.format(new Date(movement.occurredAt))} WITA`
  }))
}

const incomingRows = formatMovementRows(operationalDashboard.itemMovements.incoming)
const outgoingRows = formatMovementRows(operationalDashboard.itemMovements.outgoing)

const requestColumns = [
  { key: 'id', label: 'Nomor Permintaan' },
  { key: 'requester', label: 'Pemohon' },
  { key: 'division', label: 'Divisi' },
  { key: 'item', label: 'Barang' },
  { key: 'quantity', label: 'Jumlah', align: 'right' as const },
  { key: 'requestedAt', label: 'Tanggal' },
  { key: 'approver', label: 'Penyetuju' },
  { key: 'status', label: 'Status', type: 'badge' as const }
]

const requestSummary = [
  { label: 'Total Permintaan', value: String(operationalDashboard.summary.itemRequests) },
  { label: 'Menunggu Persetujuan', value: String(operationalDashboard.summary.pendingRequests), tone: 'warning' as const },
  { label: 'Sudah Diproses', value: '29', tone: 'success' as const }
]

const cards = [
  {
    label: 'Barang Masuk',
    value: operationalDashboard.summary.incomingItems,
    detail: operationalDashboard.period.label,
    icon: PackagePlus,
    iconBg: 'bg-[var(--uui-success-50)]',
    iconColor: 'text-[var(--uui-success-600)]',
    accentClass: 'bg-[var(--uui-success-600)]',
    detailType: 'incoming' as const
  },
  {
    label: 'Barang Keluar',
    value: operationalDashboard.summary.outgoingItems,
    detail: operationalDashboard.period.label,
    icon: PackageMinus,
    iconBg: 'bg-[var(--uui-warning-50)]',
    iconColor: 'text-[var(--uui-warning-600)]',
    accentClass: 'bg-[var(--uui-warning-600)]',
    detailType: 'outgoing' as const
  },
  {
    label: 'Permintaan Barang',
    value: operationalDashboard.summary.itemRequests,
    detail: `${operationalDashboard.summary.pendingRequests} menunggu persetujuan`,
    icon: ClipboardList,
    iconBg: 'bg-[var(--uui-brand-100)]',
    iconColor: 'text-[var(--uui-brand-600)]',
    accentClass: 'bg-[var(--uui-brand-600)]',
    detailType: 'request' as const
  }
]
</script>

<template>
  <section aria-labelledby="operational-summary-title">
    <h2 id="operational-summary-title" class="sr-only">Ringkasan operasional</h2>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <BaseCard
        v-for="card in cards"
        :key="card.label"
      >
        <CardHeader
          :title="card.label"
          :icon="card.icon"
          :icon-bg="card.iconBg"
          :icon-color="card.iconColor"
        />

        <p class="mt-4 text-3xl font-bold text-[var(--uui-gray-900)]">
          {{ formatNumber(card.value) }}
        </p>
        <p class="mt-1 text-sm text-[var(--uui-gray-500)]">{{ card.detail }}</p>

        <DetailAction
          @click="activeDetail = card.detailType"
        />
      </BaseCard>
    </div>

    <DetailTableModal
      :open="activeDetail === 'incoming'"
      title="Riwayat Barang Masuk"
      :description="`Riwayat penerimaan barang untuk periode ${operationalDashboard.period.label}.`"
      :columns="incomingColumns"
      :rows="incomingRows"
      :summary="[
        { label: 'Total Barang Masuk', value: formatNumber(operationalDashboard.summary.incomingItems), tone: 'success' },
        { label: 'Jumlah Transaksi', value: String(incomingRows.length) },
        { label: 'Transaksi Terakhir', value: '27 Juli 2026' }
      ]"
      search-placeholder="Cari transaksi, barang, supplier, atau petugas..."
      @close="activeDetail = null"
    />

    <DetailTableModal
      :open="activeDetail === 'outgoing'"
      title="Riwayat Barang Keluar"
      :description="`Riwayat penyaluran barang untuk periode ${operationalDashboard.period.label}.`"
      :columns="outgoingColumns"
      :rows="outgoingRows"
      :summary="[
        { label: 'Total Barang Keluar', value: formatNumber(operationalDashboard.summary.outgoingItems), tone: 'warning' },
        { label: 'Jumlah Transaksi', value: String(outgoingRows.length) },
        { label: 'Transaksi Terakhir', value: '27 Juli 2026' }
      ]"
      search-placeholder="Cari transaksi, barang, tujuan, atau petugas..."
      @close="activeDetail = null"
    />

    <DetailTableModal
      :open="activeDetail === 'request'"
      title="Detail Permintaan Barang"
      :description="`Permintaan barang operasional untuk periode ${operationalDashboard.period.label}.`"
      :columns="requestColumns"
      :rows="operationalItemRequestDetails"
      :summary="requestSummary"
      search-placeholder="Cari permintaan, pemohon, divisi, atau barang..."
      @close="activeDetail = null"
    />
  </section>
</template>
