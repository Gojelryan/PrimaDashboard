<script setup lang="ts">
import type { Component } from 'vue'

withDefaults(defineProps<{
  title: string
  subtitle?: string
  icon?: Component
  iconBg?: string
  iconColor?: string
  titleAs?: 'h2' | 'h3'
  iconSize?: 'sm' | 'md'
}>(), {
  subtitle: undefined,
  icon: undefined,
  iconBg: 'bg-[#F4EBFF]',
  iconColor: 'text-[#7F56D9]',
  titleAs: 'h3',
  iconSize: 'md'
})
</script>

<template>
  <header class="flex shrink-0 items-start justify-between gap-4">
    <div class="flex min-w-0 items-start gap-3">
      <slot name="leading" />

      <div class="min-w-0">
        <component
          :is="titleAs"
          class="truncate text-lg font-semibold text-[#101828]"
        >
          {{ title }}
        </component>

        <p
          v-if="subtitle"
          class="mt-1 text-sm text-[#667085]"
        >
          {{ subtitle }}
        </p>
      </div>
    </div>

    <slot name="aside">
      <span
        v-if="icon"
        class="flex shrink-0 items-center justify-center rounded-xl"
        :class="[
          iconSize === 'sm' ? 'h-9 w-9' : 'h-10 w-10',
          iconBg,
          iconColor
        ]"
        aria-hidden="true"
      >
        <component
          :is="icon"
          class="h-5 w-5"
        />
      </span>
    </slot>
  </header>
</template>
