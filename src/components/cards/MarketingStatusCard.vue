<script setup lang="ts">
import type { Component } from 'vue'
import BaseCard from './BaseCard.vue'
import CardHeader from './CardHeader.vue'

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

    <p class="mt-2 text-3xl font-bold leading-none text-[#101828]">
      {{ progress }}%
    </p>

    <div class="mt-5 space-y-2 text-sm text-[#344054]">
      <div class="flex items-center justify-between gap-4">
        <span>Home Pass</span>
        <span class="font-semibold text-[#101828]">{{ homePass.toLocaleString('id-ID') }}</span>
      </div>

      <div class="flex items-center justify-between gap-4">
        <span>Port Kosong</span>
        <span class="font-semibold text-[#101828]">{{ emptyPort.toLocaleString('id-ID') }}</span>
      </div>
    </div>

    <div class="mt-auto pt-8">
      <h4 class="text-base font-semibold text-[#101828]">
        Area Potensial
      </h4>

      <ul class="mt-4 space-y-2">
        <li
          v-for="area in potentialAreas"
          :key="area"
          class="text-sm leading-tight text-[#344054]"
        >
          {{ area }}
        </li>
      </ul>
    </div>
  </BaseCard>
</template>
