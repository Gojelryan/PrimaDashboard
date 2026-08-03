<script setup lang="ts">
import { ref } from 'vue'
import { AlertCircle, CarFront, PackageX } from 'lucide-vue-next'

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
    iconClass: 'bg-[#FCE5E6] text-[#EA5455]',
    badgeClass: 'bg-[#FCE5E6] text-[#EA5455]',
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
    iconClass: 'bg-[#D9F7FC] text-[#00CFE8]',
    badgeClass: 'bg-[#E9E7FD] text-[#7367F0]',
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

        <ul class="mt-4 space-y-2 text-sm text-[#6F6B7D]">
          <li v-for="item in card.items" :key="item" class="flex items-start gap-2">
            <AlertCircle class="mt-0.5 h-4 w-4 shrink-0 text-[#A5A2AD]" aria-hidden="true" />
            <span>{{ item }}</span>
          </li>
        </ul>

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
