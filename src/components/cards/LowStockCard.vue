<script setup lang="ts">
import { TriangleAlert } from 'lucide-vue-next'

import BaseCard from './BaseCard.vue'
import CardHeader from './CardHeader.vue'

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

const numberFormatter = new Intl.NumberFormat('id-ID')
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
            bg-[#FFF0E1]
            text-[#FF9F43]
          "
        >
          <TriangleAlert class="h-5 w-5" aria-hidden="true" />
        </span>
      </template>

      <template #aside>
        <span
          class="
            rounded-md
            bg-[#FFF0E1]
            px-2
            py-1
            text-xs
            font-semibold
            text-[#FF9F43]
          "
        >
          {{ items.length }} item
        </span>
      </template>
    </CardHeader>

    <ul
      v-if="items.length"
      class="mt-4 min-h-0 divide-y divide-[#EAECF0] overflow-y-auto"
    >
      <li
        v-for="item in items"
        :key="item.label"
        class="grid grid-cols-[minmax(0,1fr)_auto] gap-3 py-2.5 first:pt-0 last:pb-0"
      >
        <div class="min-w-0">
          <p class="truncate text-sm font-medium text-[#344054]" :title="item.label">
            {{ item.label }}
          </p>
          <p class="mt-0.5 text-xs text-[#667085]">
            Minimum {{ numberFormatter.format(item.minimum) }} {{ item.unit }}
          </p>
        </div>

        <div class="text-right">
          <p class="text-sm font-semibold text-[#DC6803]">
            {{ numberFormatter.format(item.available) }} {{ item.unit }}
          </p>
          <p class="mt-0.5 text-xs text-[#667085]">tersedia</p>
        </div>
      </li>
    </ul>

    <p v-else class="mt-4 text-sm text-[#667085]">
      Tidak ada barang dengan stok di bawah minimum.
    </p>
  </BaseCard>
</template>
