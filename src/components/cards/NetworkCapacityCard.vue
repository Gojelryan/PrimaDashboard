<script setup lang="ts">
import { Gauge, Wifi } from 'lucide-vue-next'

import BaseCard from './BaseCard.vue'
import CardHeader from './CardHeader.vue'

withDefaults(defineProps<{
  totalGbps: number
  usedGbps: number
  availableGbps: number
  title?: string
}>(), {
  title: 'Kapasitas Internet'
})

const numberFormatter = new Intl.NumberFormat('id-ID', {
  maximumFractionDigits: 2
})
</script>

<template>
  <BaseCard padding="compact">
    <CardHeader
      :title="title"
      :icon="Wifi"
      icon-bg="bg-[#D9F7FC]"
      icon-color="text-[#00CFE8]"
    />

    <p class="mt-3 text-2xl font-semibold text-[#101828]">
      {{ numberFormatter.format(totalGbps) }} Gbps
    </p>

    <div class="mt-4 space-y-2">
      <div class="flex items-center justify-between gap-3 text-sm">
        <span class="flex items-center gap-2 text-[#667085]">
          <Gauge class="h-4 w-4 text-[#7367F0]" aria-hidden="true" />
          Terpakai
        </span>
        <span class="font-semibold text-[#101828]">
          {{ numberFormatter.format(usedGbps) }} Gbps
        </span>
      </div>

      <div class="flex items-center justify-between gap-3 text-sm">
        <span class="flex items-center gap-2 text-[#667085]">
          <Wifi class="h-4 w-4 text-[#28C76F]" aria-hidden="true" />
          Tersedia
        </span>
        <span class="font-semibold text-[#101828]">
          {{ numberFormatter.format(availableGbps) }} Gbps
        </span>
      </div>
    </div>
  </BaseCard>
</template>
