<script setup lang="ts">
import { ref } from 'vue'
import { AlertCircle, CarFront, ExternalLink, PackageX } from 'lucide-vue-next'

import BaseCard from '../../../components/cards/BaseCard.vue'
import CardHeader from '../../../components/cards/CardHeader.vue'
import DetailAction from '../../../components/cards/DetailAction.vue'
import LowStockCard from '../../../components/cards/LowStockCard.vue'
import DetailTableModal from '../../../components/modals/DetailTableModal.vue'
import { operationalDashboard } from '../../../mock/dashboard/operational-dashboard'
import { outOfStockDetails } from '../../../mock/dashboard/priority-detail-data'

const isOutOfStockDetailOpen = ref(false)

const outOfStockColumns = [
  { key: 'id', label: 'ID Stok' },
  { key: 'item', label: 'Barang' },
  { key: 'minimum', label: 'Stok Minimum', align: 'right' as const },
  { key: 'available', label: 'Tersedia', align: 'right' as const },
  { key: 'lastRequest', label: 'Permintaan Terakhir' },
  { key: 'supplier', label: 'Supplier' },
  { key: 'eta', label: 'Estimasi Tersedia' },
  { key: 'status', label: 'Status', type: 'badge' as const }
]

const outOfStock = operationalDashboard.inventory.filter(item => item.warehouse === 0)
const lowStock = operationalDashboard.inventory.filter(
  item => item.warehouse > 0 && item.warehouse < item.minimumStock
)
const operationalLowStock = lowStock.map(item => ({
  label: item.item,
  available: item.warehouse,
  minimum: item.minimumStock,
  unit: item.unit
}))

const cards = [
  {
    title: 'Barang Habis',
    items: outOfStock.map(item => item.item),
    icon: PackageX,
    iconClass: 'bg-[var(--uui-error-50)] text-[var(--uui-error-600)]',
    badgeClass: 'bg-[var(--uui-error-50)] text-[var(--uui-error-600)]',
    badge: `${outOfStock.length} item`,
    role: 'alert' as const
  },
  {
    title: 'Kendaraan',
    items: [
      `Standby · ${operationalDashboard.vehicles.standby}`,
      `On Site · ${operationalDashboard.vehicles.onsite}`,
      `Service · ${operationalDashboard.vehicles.service}`
    ],
    icon: CarFront,
    iconClass: 'bg-[var(--uui-blue-50)] text-[var(--uui-blue-600)]',
    badgeClass: 'bg-[var(--uui-brand-100)] text-[var(--uui-brand-600)]',
    badge: `${operationalDashboard.vehicles.total} unit`,
    role: undefined
  }
]
</script>

<template>
  <section class="grid grid-cols-1 gap-4 md:grid-cols-3" aria-labelledby="operational-alert-title">
    <h2 id="operational-alert-title" class="sr-only">Peringatan stok dan kondisi kendaraan</h2>

    <template v-for="(card, index) in cards" :key="card.title">
      <LowStockCard
        v-if="index === 1"
        :items="operationalLowStock"
      />

      <BaseCard
        padding="compact"
        :role="card.role"
      >
        <CardHeader :title="card.title">
          <template #leading>
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" :class="card.iconClass">
              <component :is="card.icon" class="h-5 w-5" aria-hidden="true" />
            </span>
          </template>
          <template #aside>
            <span class="rounded-md px-2 py-1 text-xs font-semibold" :class="card.badgeClass">
              {{ card.badge }}
            </span>
          </template>
        </CardHeader>

        <ul class="mt-4 space-y-2 text-sm text-[var(--uui-gray-700)]">
          <li v-for="item in card.items" :key="item" class="flex items-start gap-2">
            <AlertCircle class="mt-0.5 h-4 w-4 shrink-0 text-[var(--uui-gray-500)]" aria-hidden="true" />
            <span>{{ item }}</span>
          </li>
        </ul>

        <a
          v-if="card.title === 'Kendaraan'"
          href="https://primatrack.id/login"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--uui-brand-600)] px-3.5 py-2 text-sm font-semibold text-[var(--uui-surface)] shadow-[var(--uui-shadow-xs)] transition-colors hover:bg-[var(--uui-brand-700)]"
          aria-label="Buka PrimaTrack di tab baru"
        >
          Buka PrimaTrack
          <ExternalLink class="h-4 w-4" aria-hidden="true" />
        </a>

        <DetailAction
          v-if="card.title === 'Barang Habis'"
          @click="isOutOfStockDetailOpen = true"
        />
      </BaseCard>
    </template>

    <DetailTableModal
      :open="isOutOfStockDetailOpen"
      title="Detail Barang Habis"
      description="Status pengadaan barang dengan stok gudang kosong."
      :columns="outOfStockColumns"
      :rows="outOfStockDetails"
      :summary="[
        { label: 'Barang Habis', value: `${outOfStock.length} item`, tone: 'error' },
        { label: 'Sudah Dipesan', value: '2 item', tone: 'success' },
        { label: 'Menunggu Proses', value: '1 item', tone: 'warning' }
      ]"
      search-placeholder="Cari barang, supplier, atau status..."
      @close="isOutOfStockDetailOpen = false"
    />
  </section>
</template>
