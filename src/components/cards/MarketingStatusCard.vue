<script setup lang="ts">
import type { Component } from 'vue'
import BaseCard from './BaseCard.vue'
import CardHeader from './CardHeader.vue'
import { formatNumber, formatPercentage } from '../../utils/dashboard-formatters'

defineProps<{
  title: string
  progress: number
  homePass: number
  emptyPort: number
  potentialAreas: string[]
  icon: Component
  iconBg: string
  iconColor: string
}>()
</script>

<template>
  <BaseCard>
    <CardHeader
      :title="title"
      :icon="icon"
      :icon-bg="iconBg"
      :icon-color="iconColor"
    />

    <p class="mt-2 text-3xl font-bold leading-none text-[var(--uui-gray-900)]">
      {{ formatPercentage(progress) }}
    </p>

    <div class="mt-5 space-y-2 text-sm text-[var(--uui-gray-700)]">
      <div class="flex items-center justify-between gap-4">
        <span>Home Pass</span>
        <span class="font-semibold text-[var(--uui-gray-900)]">{{ formatNumber(homePass) }}</span>
      </div>

      <div class="flex items-center justify-between gap-4">
        <span>Port Kosong</span>
        <span class="font-semibold text-[var(--uui-gray-900)]">{{ formatNumber(emptyPort) }}</span>
      </div>
    </div>

    <div class="mt-auto pt-8">
      <h4 class="text-base font-semibold text-[var(--uui-gray-900)]">
        Area Potensial
      </h4>

      <ul class="mt-4 space-y-2">
        <li
          v-for="area in potentialAreas"
          :key="area"
          class="text-sm leading-tight text-[var(--uui-gray-700)]"
        >
          {{ area }}
        </li>
      </ul>
    </div>
  </BaseCard>
</template>
