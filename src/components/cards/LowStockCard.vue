<script setup lang="ts">
import { TriangleAlert } from 'lucide-vue-next'

import BaseCard from './BaseCard.vue'
import CardHeader from './CardHeader.vue'
import { formatNumber } from '../../utils/dashboard-formatters'

withDefaults(defineProps<{
  items: {
    label: string
    available: number
    minimum: number
    unit: string
  }[]
  title?: string
}>(), {
  title: 'Barang Hampir Habis'
})

</script>

<template>
  <BaseCard padding="compact" role="alert">
    <CardHeader :title="title">
      <template #leading>
        <span
          class="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[var(--uui-warning-50)]
            text-[var(--uui-warning-600)]
          "
        >
          <TriangleAlert class="h-5 w-5" aria-hidden="true" />
        </span>
      </template>

      <template #aside>
        <span
          class="
            rounded-md
            bg-[var(--uui-warning-50)]
            px-2
            py-1
            text-xs
            font-semibold
            text-[var(--uui-warning-600)]
          "
        >
          {{ items.length }} item
        </span>
      </template>
    </CardHeader>

    <ul
      v-if="items.length"
      class="mt-4 min-h-0 divide-y divide-[var(--uui-gray-200)] overflow-y-auto"
    >
      <li
        v-for="item in items"
        :key="item.label"
        class="grid grid-cols-[minmax(0,1fr)_auto] gap-3 py-2.5 first:pt-0 last:pb-0"
      >
        <div class="min-w-0">
          <p class="truncate text-sm font-medium text-[var(--uui-gray-700)]" :title="item.label">
            {{ item.label }}
          </p>
          <p class="mt-0.5 text-xs text-[var(--uui-gray-500)]">
            Minimum {{ formatNumber(item.minimum) }} {{ item.unit }}
          </p>
        </div>

        <div class="text-right">
          <p class="text-sm font-semibold text-[var(--uui-warning-600)]">
            {{ formatNumber(item.available) }} {{ item.unit }}
          </p>
          <p class="mt-0.5 text-xs text-[var(--uui-gray-500)]">tersedia</p>
        </div>
      </li>
    </ul>

    <p v-else class="mt-4 text-sm text-[var(--uui-gray-500)]">
      Tidak ada barang dengan stok di bawah minimum.
    </p>
  </BaseCard>
</template>
