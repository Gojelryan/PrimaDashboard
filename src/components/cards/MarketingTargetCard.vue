<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import BaseCard from './BaseCard.vue'
import CardHeader from './CardHeader.vue'

const props = defineProps<{
  title: string
  target: string
  currentLabel: string
  current: string
  progress: number
  icon: Component
  iconBg: string
  iconColor: string
}>()

const progressStyle = computed(() => ({
  background: `conic-gradient(#7F56D9 ${props.progress * 3.6}deg, #F2F4F7 0deg)`
}))
</script>

<template>
  <BaseCard class="min-h-[224px]" padding="compact">
    <CardHeader
      :title="title"
      :icon="icon"
      :icon-bg="iconBg"
      :icon-color="iconColor"
      icon-size="sm"
    />

    <p class="mt-3 text-base font-semibold text-[#101828]">
      {{ target }}
    </p>

    <div class="mt-auto flex items-end justify-between gap-4">
      <div class="min-w-0">
        <p class="text-sm text-[#667085]">
          {{ currentLabel }}
        </p>

        <p class="mt-1 truncate text-base font-semibold text-[#101828]">
          {{ current }}
        </p>
      </div>

      <div
        class="
          flex
          h-20
          w-20
          shrink-0
          items-center
          justify-center
          rounded-full
        "
        :style="progressStyle"
      >
        <div
          class="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            bg-white
            text-2xl
            font-bold
            text-[#344054]
          "
        >
          {{ progress }}%
        </div>
      </div>
    </div>
  </BaseCard>
</template>
