<script setup lang="ts">
import type { Component } from 'vue'

import BaseCard from './BaseCard.vue'
import CardHeader from './CardHeader.vue'
import { formatPercentage } from '../../utils/dashboard-formatters'

defineProps<{
  title: string
  subtitle: string
  total: string
  icon: Component
  iconBg: string
  iconColor: string
  items: {
    label: string
    value: string
    percentage: number
    accentClass: string
  }[]
}>()
</script>

<template>
  <BaseCard padding="compact">
    <CardHeader
      :title="title"
      :subtitle="subtitle"
      :icon="icon"
      :icon-bg="iconBg"
      :icon-color="iconColor"
      icon-size="sm"
    />

    <div class="mt-5 flex items-end justify-between gap-4">
      <div>
        <p class="text-sm text-[var(--uui-gray-500)]">
          Total pelanggan
        </p>
        <p class="mt-1 text-3xl font-bold leading-none text-[var(--uui-gray-900)]">
          {{ total }}
        </p>
      </div>

      <span class="rounded-full bg-[var(--uui-gray-100)] px-2.5 py-1 text-xs font-medium text-[var(--uui-gray-600)]">
        {{ items.length }} segmen
      </span>
    </div>

    <div class="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div
        v-for="item in items"
        :key="item.label"
        class="rounded-lg border border-[var(--uui-gray-200)] bg-[var(--uui-page)] p-3"
      >
        <div class="flex items-center justify-between gap-3">
          <div class="flex min-w-0 items-center gap-2">
            <span
              class="h-2.5 w-2.5 shrink-0 rounded-full"
              :class="item.accentClass"
              aria-hidden="true"
            />
            <span class="truncate text-sm font-medium text-[var(--uui-gray-700)]">
              {{ item.label }}
            </span>
          </div>

          <span class="shrink-0 text-xs font-medium text-[var(--uui-gray-500)]">
            {{ formatPercentage(item.percentage) }}
          </span>
        </div>

        <p class="mt-2 text-xl font-semibold leading-none text-[var(--uui-gray-900)]">
          {{ item.value }}
        </p>

        <div class="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--uui-gray-200)]">
          <div
            class="h-full rounded-full"
            :class="item.accentClass"
            :style="{ width: `${item.percentage}%` }"
            role="progressbar"
            :aria-label="`Proporsi pelanggan ${item.label}`"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-valuenow="item.percentage"
          />
        </div>
      </div>
    </div>
  </BaseCard>
</template>
