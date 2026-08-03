<script setup lang="ts">
import type { Component } from 'vue'
import BaseCard from './BaseCard.vue'
import CardHeader from './CardHeader.vue'

defineProps<{
  title: string
  value?: string
  subtitle?: string
  icon?: Component
  iconBg?: string
  iconColor?: string
  itemLayout?: 'inline' | 'stacked'
  items?: {
    label: string
    value: string
    markerColor?: string
  }[]
}>()

const markerColorMap: Record<string, string> = {
  '#2563EB': '#1570EF',
  '#CBD5E1': '#D0D5DD'
}

function resolveMarkerColor(color: string) {
  return markerColorMap[color.toUpperCase()] ?? color
}
</script>

<template>
  <BaseCard class="min-h-52" padding="compact">
    <CardHeader
      :title="title"
      :subtitle="subtitle"
      :icon="icon"
      :icon-bg="iconBg ?? 'bg-[#EFF8FF]'"
      :icon-color="iconColor ?? 'text-[#1570EF]'"
      icon-size="sm"
    />

    <p
      v-if="value"
      class="
        mt-4
        text-2xl
        font-bold
        leading-none
        text-[#101828]
      "
    >
      {{ value }}
    </p>

    <div
      v-if="items?.length"
      class="
        space-y-2
      "
      :class="value ? 'mt-3' : 'mt-4'"
    >
      <div
        v-for="item in items"
        :key="item.label"
        class="
          leading-tight
        "
        :class="itemLayout === 'stacked'
          ? 'flex flex-col gap-1'
          : 'flex items-center justify-between gap-6'"
      >
        <span
          class="
            flex
            items-center
            gap-2
            min-w-0
            truncate
            text-sm
            text-[#344054]
          "
        >
          <span
            v-if="item.markerColor"
            class="
              h-2.5
              w-2.5
              shrink-0
              rounded-full
            "
            :style="{ backgroundColor: resolveMarkerColor(item.markerColor) }"
          />

          <span class="min-w-0 truncate">
            {{ item.label }}
          </span>
        </span>

        <span
          class="
            shrink-0
            font-semibold
            text-[#101828]
          "
          :class="itemLayout === 'stacked'
            ? 'text-2xl leading-none'
            : 'text-sm'"
        >
          {{ item.value }}
        </span>
      </div>
    </div>

    <div
      v-else-if="$slots.default"
      class="mt-4"
    >
      <slot />
    </div>
  </BaseCard>
</template>
