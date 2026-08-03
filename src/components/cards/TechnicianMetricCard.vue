<script setup lang="ts">
import type { Component } from 'vue'
import BaseCard from './BaseCard.vue'
import CardHeader from './CardHeader.vue'

defineProps<{
  title: string
  value?: string
  icon: Component
  iconBg: string
  iconColor: string
  items?: {
    label: string
    value: string
  }[]
}>()
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

    <p
      v-if="value"
      class="mt-4 text-2xl font-bold leading-none text-[#101828]"
    >
      {{ value }}
    </p>

    <div
      v-if="items?.length"
      class="mt-4 space-y-2"
    >
      <div
        v-for="item in items"
        :key="item.label"
        class="flex items-center justify-between gap-4 text-sm leading-tight"
      >
        <span class="min-w-0 truncate text-[#344054]">
          {{ item.label }}
        </span>

        <span class="shrink-0 font-semibold text-[#101828]">
          {{ item.value }}
        </span>
      </div>
    </div>

    <div
      v-if="$slots.footer"
      class="mt-auto flex justify-end pt-3"
    >
      <slot name="footer" />
    </div>
  </BaseCard>
</template>
