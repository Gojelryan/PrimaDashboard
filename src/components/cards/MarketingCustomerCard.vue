<script setup lang="ts">
import type { Component } from 'vue'
import BaseCard from './BaseCard.vue'
import CardHeader from './CardHeader.vue'

withDefaults(defineProps<{
  title: string
  total: string
  newCustomer: string
  churnCustomer: string
  outstanding: string
  newCustomerLabel?: string
  churnCustomerLabel?: string
  icon: Component
  iconBg: string
  iconColor: string
}>(), {
  newCustomerLabel: 'Pelanggan Baru',
  churnCustomerLabel: 'Pelanggan Putus',
})
</script>

<template>
  <BaseCard padding="compact">
    <CardHeader
      :title="title"
      :icon="icon"
      :icon-bg="iconBg"
      :icon-color="iconColor"
      icon-size="sm"
    />

    <p class="mt-3 text-2xl font-bold leading-none text-[var(--uui-gray-900)]">
      {{ total }}
    </p>

    <div class="mt-4 space-y-2">
      <div class="flex items-center justify-between gap-4 text-sm leading-tight">
        <span class="min-w-0 truncate text-[var(--uui-gray-700)]">
          {{ newCustomerLabel }}
        </span>

        <span class="shrink-0 font-semibold text-[var(--uui-gray-900)]">
          {{ newCustomer }}
        </span>
      </div>

      <div class="flex items-center justify-between gap-4 text-sm leading-tight">
        <span class="min-w-0 truncate text-[var(--uui-gray-700)]">
          {{ churnCustomerLabel }}
        </span>

        <span class="shrink-0 font-semibold text-[var(--uui-gray-900)]">
          {{ churnCustomer }}
        </span>
      </div>
    </div>

    <div class="mt-auto flex items-end justify-between gap-3 pt-4">
      <div class="min-w-0">
        <p class="text-sm text-[var(--uui-gray-500)]">
          Outstanding
        </p>

        <p class="mt-1 truncate text-xl font-bold leading-none text-[var(--uui-gray-900)]">
          {{ outstanding }}
        </p>
      </div>

      <slot name="footer" />
    </div>
  </BaseCard>
</template>
