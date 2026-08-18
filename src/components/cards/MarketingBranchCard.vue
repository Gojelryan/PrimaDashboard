<script setup lang="ts">
import type { Component } from 'vue'
import BaseCard from './BaseCard.vue'
import CardHeader from './CardHeader.vue'
import DetailAction from './DetailAction.vue'
import { formatNumber } from '../../utils/dashboard-formatters'

defineProps<{
  title: string
  icon: Component
  iconBg: string
  iconColor: string
  data: {
    totalPartner: number
    totalCustomer: number
    areas: {
      name: string
      partner: number
      customer: number
    }[]
  }
}>()

defineEmits<{
  detail: []
}>()
</script>

<template>
  <BaseCard>
    <CardHeader
      :title="title"
      :icon="icon"
      :icon-bg="iconBg"
      :icon-color="iconColor"
    >
      <template #aside>
        <div class="flex shrink-0 items-center gap-1">
          <DetailAction inline @click="$emit('detail')" />
          <span
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            :class="[iconBg, iconColor]"
            aria-hidden="true"
          >
            <component :is="icon" class="h-5 w-5" />
          </span>
        </div>
      </template>
    </CardHeader>

    <div class="mt-4 grid grid-cols-2 gap-3">
      <div
        class="rounded-lg bg-[var(--uui-brand-50)] p-3"
      >
        <p class="text-xs font-medium uppercase tracking-wide text-[var(--uui-gray-500)]">
          Total Mitra
        </p>
        <p class="mt-1 text-2xl font-bold text-[var(--uui-gray-900)]">
          {{ formatNumber(data.totalPartner) }}
        </p>
      </div>

      <div class="rounded-lg bg-[var(--uui-blue-50)] p-3 text-right">
        <p class="text-xs font-medium uppercase tracking-wide text-[var(--uui-gray-500)]">
          Total Pelanggan
        </p>
        <p class="mt-1 text-2xl font-bold text-[var(--uui-gray-900)]">
          {{ formatNumber(data.totalCustomer) }}
        </p>
      </div>
    </div>

    <div class="mt-4 grid grid-cols-[minmax(0,1fr)_72px_104px] gap-3 border-b border-[var(--uui-gray-200)] pb-2 text-xs font-semibold uppercase tracking-wide text-[var(--uui-gray-500)]">
      <span>Wilayah</span>
      <span class="text-right">Mitra</span>
      <span class="text-right">Pelanggan</span>
    </div>

    <div class="min-h-0 flex-1 divide-y divide-[var(--uui-gray-200)] overflow-y-auto pr-1">
      <div
        v-for="area in data.areas"
        :key="area.name"
        class="grid grid-cols-[minmax(0,1fr)_72px_104px] items-center gap-3 py-2.5 text-sm"
      >
        <span class="min-w-0 truncate font-medium text-[var(--uui-gray-700)]" :title="area.name">
          {{ area.name }}
        </span>
        <span class="text-right font-semibold text-[var(--uui-gray-900)]">
          {{ formatNumber(area.partner) }}
        </span>
        <span class="text-right font-semibold text-[var(--uui-gray-900)]">
          {{ formatNumber(area.customer) }}
        </span>
      </div>
    </div>

  </BaseCard>
</template>
