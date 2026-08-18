<script setup lang="ts">
import { Gauge, Wifi } from 'lucide-vue-next'

import BaseCard from './BaseCard.vue'
import CardHeader from './CardHeader.vue'
import { formatNumber } from '../../utils/dashboard-formatters'

withDefaults(defineProps<{
  totalGbps: number
  usedGbps: number
  availableGbps: number
  title?: string
}>(), {
  title: 'Kapasitas Internet'
})

</script>

<template>
  <BaseCard padding="compact">
    <CardHeader
      :title="title"
      :icon="Wifi"
      icon-bg="bg-[var(--uui-blue-50)]"
      icon-color="text-[var(--uui-blue-600)]"
    />

    <p class="mt-3 text-2xl font-semibold text-[var(--uui-gray-900)]">
      {{ formatNumber(totalGbps, 2) }} Gbps
    </p>

    <div class="mt-4 space-y-2">
      <div class="flex items-center justify-between gap-3 text-sm">
        <span class="flex items-center gap-2 text-[var(--uui-gray-500)]">
          <Gauge class="h-4 w-4 text-[var(--uui-brand-600)]" aria-hidden="true" />
          Terpakai
        </span>
        <span class="font-semibold text-[var(--uui-gray-900)]">
          {{ formatNumber(usedGbps, 2) }} Gbps
        </span>
      </div>

      <div class="flex items-center justify-between gap-3 text-sm">
        <span class="flex items-center gap-2 text-[var(--uui-gray-500)]">
          <Wifi class="h-4 w-4 text-[var(--uui-success-600)]" aria-hidden="true" />
          Tersedia
        </span>
        <span class="font-semibold text-[var(--uui-gray-900)]">
          {{ formatNumber(availableGbps, 2) }} Gbps
        </span>
      </div>
    </div>
  </BaseCard>
</template>
