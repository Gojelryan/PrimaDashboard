<script setup lang="ts">
import { Boxes, Warehouse } from 'lucide-vue-next'

import DashboardPanelCard from '../../../components/cards/DashboardPanelCard.vue'
import { operationalDashboard } from '../../../mock/dashboard/operational-dashboard'

const numberFormatter = new Intl.NumberFormat('id-ID')

function formatStock(value: number, unit: string) {
  return `${numberFormatter.format(value)} ${unit}`
}
</script>

<template>
  <section class="grid grid-cols-1 gap-4 lg:grid-cols-12" aria-label="Inventaris dan stok gudang">
    <DashboardPanelCard
      class="lg:col-span-8 xl:col-span-9"
      title="Inventaris"
      :subtitle="`Posisi stok ${operationalDashboard.period.label}`"
      :icon="Boxes"
      icon-bg="bg-[#E9E7FD]"
      icon-color="text-[#7367F0]"
    >
      <div class="overflow-x-auto">
      <table class="w-full min-w-[640px] text-left text-sm">
        <caption class="sr-only">Daftar jumlah, pemakaian, dan stok gudang per jenis barang</caption>
        <thead>
          <tr class="border-b border-[#DBDADE] text-xs uppercase tracking-wide text-[#A5A2AD]">
            <th scope="col" class="pb-3 pr-4 font-semibold">Jenis barang</th>
            <th scope="col" class="pb-3 px-4 text-right font-semibold">Qty</th>
            <th scope="col" class="pb-3 px-4 text-right font-semibold">Terpakai</th>
            <th scope="col" class="pb-3 pl-4 text-right font-semibold">Gudang</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#F1F0F2]">
          <tr v-for="item in operationalDashboard.inventory" :key="item.item" class="hover:bg-[#F8F7FA]">
            <th scope="row" class="py-3 pr-4 font-medium text-[#5D596C]">{{ item.item }}</th>
            <td class="px-4 py-3 text-right text-[#6F6B7D]">{{ formatStock(item.quantity, item.unit) }}</td>
            <td class="px-4 py-3 text-right text-[#6F6B7D]">{{ formatStock(item.used, item.unit) }}</td>
            <td class="py-3 pl-4 text-right font-semibold text-[#5D596C]">{{ formatStock(item.warehouse, item.unit) }}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </DashboardPanelCard>

    <DashboardPanelCard
      class="lg:col-span-4 xl:col-span-3"
      title="Stok Gudang"
      subtitle="Kondisi barang tersimpan"
      :icon="Warehouse"
      icon-bg="bg-[#D9F7FC]"
      icon-color="text-[#00CFE8]"
    >
      <div class="overflow-x-auto">
      <table class="w-full min-w-[300px] text-sm">
        <caption class="sr-only">Kondisi baik dan rusak untuk stok gudang</caption>
        <thead>
          <tr class="border-b border-[#DBDADE] text-xs uppercase tracking-wide text-[#A5A2AD]">
            <th scope="col" class="pb-3 pr-3 text-left font-semibold">Barang</th>
            <th scope="col" class="px-2 pb-3 text-right font-semibold">Baik</th>
            <th scope="col" class="pb-3 pl-2 text-right font-semibold">Rusak</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#F1F0F2]">
          <tr v-for="item in operationalDashboard.inventory" :key="item.item" class="hover:bg-[#F8F7FA]">
            <th scope="row" class="max-w-32 truncate py-3 pr-3 text-left font-medium text-[#5D596C]" :title="item.item">
              {{ item.item }}
            </th>
            <td class="px-2 py-3 text-right text-[#28C76F]">{{ numberFormatter.format(item.good) }}</td>
            <td class="py-3 pl-2 text-right" :class="item.damaged ? 'font-semibold text-[#EA5455]' : 'text-[#A5A2AD]'">
              {{ numberFormatter.format(item.damaged) }}
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </DashboardPanelCard>
  </section>
</template>
