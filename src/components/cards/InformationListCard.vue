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

</script>

<template>
  <BaseCard class="min-h-52" hierarchy="subtle" padding="compact">
    <CardHeader
      :title="title"
      :subtitle="subtitle"
      :icon="icon"
      :icon-bg="iconBg ?? 'bg-[var(--uui-blue-50)]'"
      :icon-color="iconColor ?? 'text-[var(--uui-blue-600)]'"
      icon-size="sm"
    />

    <p
      v-if="value"
      class="
        mt-4
        text-2xl
        font-bold
        leading-none
        text-[var(--uui-gray-900)]
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
            text-[var(--uui-gray-700)]
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
            :style="{ backgroundColor: item.markerColor }"
          />

          <span class="min-w-0 truncate">
            {{ item.label }}
          </span>
        </span>

        <span
          class="
            shrink-0
            font-semibold
            text-[var(--uui-gray-900)]
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
